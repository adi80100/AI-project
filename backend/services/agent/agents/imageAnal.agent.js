import { getModel } from "../config/llmmodels.js"
import fs from "fs/promises"
import { deductCredits } from "../util/deductCredits.js"
import { HumanMessage, SystemMessage } from "@langchain/core/messages"
export const imageAnalyzer =async (state)=>{
    try {
        const llm  = await getModel("imageAnalyzer")
        const imageBuffer = await fs.readFile(state.file.path)

       const base64image= imageBuffer.toString("base64")
     const messages=[
            new SystemMessage(
            `You are CortexAI image analyzer Agent
            Rules:
            -Analyze only the uploaded image.
            -Answer the user's question accurately.
            -If text exists in the image, extract it.
            -If charts or tables exist, explain them.
            -
            If something is unclear, say so.
            -Use Markdown when helpful.
            -Do not hallucinate`),
            new HumanMessage(
                {
                    content:[{
                        type:"text",
                        text:state.prompt || "analyze the image",
                    },
                    {
                        type:"image_url",
                        image_url:{
                            url:`data:${state.file.mimetype};base64,${base64image}`
                        }
                    }
                ]
                }
            )
            ]

            const response = await llm.invoke(messages)
                    await deductCredits(state,state.userId,"vision")
            
            return {
                ...state,
                aiResponse:response.content
            }



    } catch (error) {
        console.log("error from iamgeAnal",error)
        return {
                ...state,
                aiResponse:"failed to analyze file"
            }
    }
    finally{
         if (state.file?.path) {
        await fs.unlink(state.file.path);
    }
    }
}