import dotenv from "dotenv";
import express from "express";
import { ChatOpenAI } from "@langchain/openai";
import {
  START,
  END,
  StateGraph,
  MemorySaver,
  Annotation,
  messagesStateReducer,
} from "@langchain/langgraph";
import { pull } from "langchain/hub";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
  trimMessages,
} from "@langchain/core/messages";
import cors from "cors";
import { z } from "zod";
import { dbConfig, getTableInfo, startConnection } from "./repository/table.js";
import { SqlDatabase } from "langchain/sql_db";
import { DataSource } from "typeorm";
import { QuerySqlTool } from "langchain/tools/sql";

dotenv.config();

// Entry point for the server
const PORT = process.env.NODE_PORT || 3000;

// Database initialization
const datasource = new DataSource({
  // @ts-ignore
  type: dbConfig.type,
  database: dbConfig.database,
  username: dbConfig.user,
  password: dbConfig.password,
  host: dbConfig.host,
});
const db = await SqlDatabase.fromDataSourceParams({
  appDataSource: datasource,
});

// Get OpenAI API key
const openaiApiKey = process.env.OPENAI_API_KEY;
if (!openaiApiKey) {
  throw new Error("The OPENAI_API_KEY environment variable is not set.");
}
// Thread ID for keeping track of the conversation
const config = { configurable: { thread_id: 1 } };

// Cors option for the server
const corsOptions = {
  origin: [process.env.CORS_ORIGIN],
};

const app = express();
app.use(express.json());
// @ts-ignore
app.use(cors(corsOptions));

// Setting up the OpenAI API
const llm = new ChatOpenAI({
  apiKey: openaiApiKey,
  model: "gpt-4o-mini",
  temperature: 0,
});

// Define a trimmer for the messages
const trimmer = trimMessages({
  maxTokens: 20,
  strategy: "last",
  tokenCounter: (msgs) => msgs.length,
  includeSystem: true,
  allowPartial: false,
  startOn: "human",
});

// // Define a prompt template for the chat
// const promptTemplate = ChatPromptTemplate.fromMessages([
//   [
//     "system",
//     "Act as an experienced student assistant. You are now able to intelligently answer questions about the information you have been provided.",
//   ],
//   ["placeholder", "{messages}"],
// ]);

// // Define the function that calls the model for the chat
// const callModel = async (state) => {
//   const trimmedMessage = await trimmer.invoke(state.messages);
//   const prompt = await promptTemplate.invoke({
//     messages: trimmedMessage,
//     language: state.language,
//   });
//   const response = await llm.invoke(prompt);
//   return { messages: response };
// };

// Create a new annotation for the input state
const InputStateAnnotation = Annotation.Root({
  question: Annotation,
});

const StateAnnotation = Annotation.Root({
  messages: Annotation({
    reducer: messagesStateReducer,
    default: () => [],
  }),
  question: Annotation,
  query: Annotation,
  result: Annotation,
  answer: Annotation,
});

// Define a prompt template for the SQL query system
const queryPromptTemplate = await pull("langchain-ai/sql-query-system-prompt");
const queryOutput = z.object({
  query: z.string().describe("Syntactically valid SQL query."),
});
const structuredLlm = llm.withStructuredOutput(queryOutput);

const writeQuery = async (state) => {
  const promptValue = await queryPromptTemplate.invoke({
    dialect: db.appDataSourceOptions.type,
    top_k: 10,
    table_info: await db.getTableInfo(),
    input: state.question,
  });
  const result = await structuredLlm.invoke(promptValue);
  return { query: result.query };
};

const executeQuery = async (state) => {
  const executeQueryTool = new QuerySqlTool(db);
  return { result: await executeQueryTool.invoke(state.query) };
};

const answerPromptTemplate = ChatPromptTemplate.fromMessages([
  [
    "system",
    "Act as an experienced student assistant. You are now able to intelligently answer questions about the information you have been provided. Given the following user question, corresponding SQL query, and SQL result, answer the user question.\n\nQuestion: {question}\nSQL Query: {query}\nSQL Result: {result}\n",
  ],
  ["placeholder", "{messages}"],
]);

const generateAnswer = async (state) => {
  const trimmedMessage = await trimmer.invoke(state.messages);
  const promptValue = await answerPromptTemplate.invoke({
    messages: trimmedMessage,
    question: state.question,
    query: state.query,
    result: state.result,
  });
  const response = await llm.invoke(promptValue);
  return {
    answer: response.content,
    messages: response,
  };
};

// Define a new graph
const workflow = new StateGraph({ stateSchema: StateAnnotation })
  // Define the node and edge
  // .addNode("model", callModel)
  .addNode("writeQuery", writeQuery)
  .addNode("executeQuery", executeQuery)
  .addNode("generateAnswer", generateAnswer)
  // .addEdge(START, "model")
  .addEdge(START, "writeQuery")
  .addEdge("writeQuery", "executeQuery")
  .addEdge("executeQuery", "generateAnswer")
  .addEdge("generateAnswer", END);

// Add memory
const memory = new MemorySaver();
const llmApp = workflow.compile({ checkpointer: memory });

// Start the server on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post("/chat", async (req, res) => {
  const { newMessage } = req.body;
  try {
    // console.log(inputs);
    // console.log("\n====\n");
    // for await (const step of await llmApp.stream(inputs, {
    //   streamMode: "updates",
    // })) {
    //   console.log(step);
    //   console.log("\n====\n");
    // }
    const response = await llmApp.invoke({ question: newMessage }, config);
    // const responseMessage = response.messages[response.messages.length - 1];
    res.json({
      message: response,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
});

// // Get courses for a user
// app.get("/users/:id/courses", async (req, res) => {
//   const userId = req.params.id;

//   try {
//     if (!connection) {
//       throw new Error("MySQL connection is not established.");
//     }
//     const [rows] = await connection.query(
//       "SELECT courses.* FROM courses JOIN student_courses ON courses.course_id = student_courses.course_id WHERE student_courses.student_id = ?",
//       [userId]
//     );
//     res.json({ courses: rows });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Internal Server Error", error: error });
//   }
// });
