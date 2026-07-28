
import { ChatGroq } from "@langchain/groq";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

import { HumanMessage } from "@langchain/core/messages";

const groq = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY, 
  model: "llama-3.3-70b-versatile",
});

const gemini = new ChatGoogleGenerativeAI({
  model: "gemini-pro",
  maxOutputTokens: 2048,
});

export const getModel = async(agent)=>{
    switch (agent) {
        case "chat":
            return groq;
        case "search":
            return groq;
        case "coding":
            return gemini;
        case "chat":
            return groq;
        case "chat":
            return groq;

        default :
            return groq


  
          
    
        default:
            break;
    }
}
