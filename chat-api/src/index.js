import dotenv from "dotenv";
import express, { response } from "express";
import { ChatOpenAI } from "@langchain/openai";
import {
  START,
  END,
  StateGraph,
  MemorySaver,
  Annotation,
  messagesStateReducer,
} from "@langchain/langgraph";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { trimMessages } from "@langchain/core/messages";
import cors from "cors";
import { z } from "zod";
import { dbConfig } from "./repository/studentTable.js";
import { startConnection as userDbConnection } from "./repository/userTable.js";
import { SqlDatabase } from "langchain/sql_db";
import { DataSource } from "typeorm";
import { QuerySqlTool } from "langchain/tools/sql";
import { promptTemplates } from "./prompt/promptTemplates.js";
import { getUserData } from "./repository/github.js";
import { getUserData as getUserDBData } from "./repository/userTable.js";

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

const userDb = await userDbConnection();
if (!db || !userDb) {
  throw new Error("Database connection failed");
}

// Get OpenAI API key
const openaiApiKey = process.env.OPENAI_API_KEY;
if (!openaiApiKey) {
  throw new Error("The OPENAI_API_KEY environment variable is not set.");
}

// Cors option for the server
const corsOptions = {
  origin: [process.env.CORS_ORIGIN],
};

const app = express();
// @ts-ignore
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
// @ts-ignore
const InputStateAnnotation = Annotation.Root({
  question: Annotation,
  id: Annotation,
});

const StateAnnotation = Annotation.Root({
  messages: Annotation({
    reducer: messagesStateReducer,
    default: () => [],
  }),
  id: Annotation,
  question: Annotation,
  query: Annotation,
  result: Annotation,
  answer: Annotation,
});

// // Define a system prompt template for the SQL query system
// const systemPromptTemplate = ChatPromptTemplate.fromMessages(
//   // @ts-ignore
//   promptTemplates.systemPromptTemplate
// );

// Define a prompt template for the SQL query system
const queryPromptTemplate = ChatPromptTemplate.fromMessages(
  // @ts-ignore
  promptTemplates.queryPromptTemplate
);
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
    userId: state.id,
  });
  // const systemMessage = await queryPromptTemplate.format({
  //   dialect: db.appDataSourceOptions.type,
  //   top_k: 10,
  //   table_info: await db.getTableInfo(),
  //   input: state.question,
  //   userId: state.id,
  // });
  // const agent = createReactAgent({
  //   llm: llm,
  //   tools: tools,
  //   stateModifier: systemMessage,
  // });
  // const input = {
  //   messages: [{ role: "user", content: state.question }],
  // };
  // const result = await agent.invoke(input);

  const result = await structuredLlm.invoke(promptValue);
  return { query: result.query };
};

const executeQuery = async (state) => {
  const executeQueryTool = new QuerySqlTool(db);
  return { result: await executeQueryTool.invoke(state.query) };
};

const answerPromptTemplate = ChatPromptTemplate.fromMessages(
  // @ts-ignore
  promptTemplates.answerPromptTemplate
);

const generateAnswer = async (state) => {
  const trimmedMessage = await trimmer.invoke(state.messages);
  const promptValue = await answerPromptTemplate.invoke({
    messages: trimmedMessage,
    question: state.question,
    query: state.query,
    result: state.result,
    userId: state.id,
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
// @ts-ignore
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// @ts-ignore
app.post("/chat", async (req, res) => {
  const { newMessage, provider, id } = req.body;
  console.log(id);

  let userData;
  if (provider === "github") {
    try {
      if (!req.headers["authorization"]) {
        throw new Error("Authorization failed");
      }
      const accessToken = req.headers.authorization.split(" ")[1];
      userData = await getUserData(accessToken);
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: `Authorization Failed`, error: error });
      return;
    }
  } else {
    try {
      // const sessionToken =
      const res = await getUserDBData(id, userDb);
      userData = res[0];
  
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: `Authorization Failed`, error: error });
      return;
    }
  }

  // Get userID from the token
  const userId = userData.id;

  // Use userId for Thread ID for keeping track of the conversation
  const config = { configurable: { thread_id: parseInt(userId) } };
  try {
    const response = await llmApp.invoke(
      { question: newMessage, id: userId },
      config
    );
    // const responseMessage = response.messages[response.messages.length - 1];
    res.json({
      message: response,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
});
