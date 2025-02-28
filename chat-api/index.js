import dotenv from "dotenv";
import express from "express";
import { ChatOpenAI } from "@langchain/openai";
import {
  START,
  END,
  MessagesAnnotation,
  StateGraph,
  MemorySaver,
} from "@langchain/langgraph";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
  SystemMessage,
  HumanMessage,
  AIMessage,
  trimMessages,
} from "@langchain/core/messages";

dotenv.config();
const openaiApiKey = process.env.OPENAI_API_KEY;

const config = { configurable: { thread_id: 1 } };

if (!openaiApiKey) {
  throw new Error("The OPENAI_API_KEY environment variable is not set.");
}

const app = express();
app.use(express.json());

const llm = new ChatOpenAI({
  apiKey: openaiApiKey,
  model: "gpt-4o-mini",
  temperature: 0,
});

const PORT = process.env.PORT || 3000;

// Define a trimmer
const trimmer = trimMessages({
  maxTokens: 20,
  strategy: "last",
  tokenCounter: (msgs) => msgs.length,
  includeSystem: true,
  allowPartial: false,
  startOn: "human",
});

// Define a prompt template
const promptTemplate = ChatPromptTemplate.fromMessages([
  [
    "system",
    "Act as an experienced student advisor. You are now able to intelligently answer questions about the information you have been provided.",
  ],
  ["placeholder", "{messages}"],
]);

// Define the function that calls the model
const callModel = async (state) => {
  const trimmedMessage = await trimmer.invoke(state.messages);
  const prompt = await promptTemplate.invoke({
    messages: trimmedMessage,
    language: state.language,
  });
  const response = await llm.invoke(prompt);
  return { messages: response };
};

// Define a new graph
const workflow = new StateGraph(MessagesAnnotation)
  // Define the node and edge
  .addNode("model", callModel)
  .addEdge(START, "model")
  .addEdge("model", END);

// Add memory
const memory = new MemorySaver();
const llmApp = workflow.compile({ checkpointer: memory });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post("/chat", async (req, res) => {
  const { newMessage } = req.body;
  try {
    const response = await llmApp.invoke({ messages: newMessage }, config);
    res.json({
      message: response.messages[response.messages.length - 1],
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
