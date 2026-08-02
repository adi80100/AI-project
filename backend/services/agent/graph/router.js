import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getModel } from "../config/llmmodels.js";

export const router = async (state) => {
  if (state?.agent && state.agent !== "auto") {
    return state;
  }

  const llm = await getModel("router");

  const response = await llm.invoke([
    new SystemMessage(`
You are an AI router.

Choose ONLY one of these agents:
- chat
- search
- coding
- pdf
- ppt
- image


Rules:
- search: latest information, web facts, news, products, trends, current events
- coding: programming, debugging, code generation
- pdf: PDF analysis
- ppt: PowerPoint generation/analysis
- image: image generation or image understanding
- otherwise: chat

Return ONLY the agent name.
`),
    new HumanMessage(state.prompt),
  ]);

  const agent = response.content.trim().toLowerCase();

  console.log("Selected Agent:", agent);

  return {
    ...state,
    agent,
  };
};