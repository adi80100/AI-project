import axios from "axios"
import { graph } from "../graph/graph.js"

export const agent = async(req,res)=>{
    try {
        const {prompt,conversationId} = req.body
        await axios.post(`${process.env.CHAT_SERVICE_URL}/save-message`,{
            conversationId,role:"user",content:prompt
        })
        const result = await graph.invoke({
            prompt,conversationId,
        })
        // give the value from the state
        const response = typeof result?.aiResponse === 'string'
            ? result.aiResponse
            : typeof result?.content === 'string'
                ? result.content
                : typeof result?.text === 'string'
                    ? result.text
                    : JSON.stringify(result)

        await axios.post(`${process.env.CHAT_SERVICE_URL}/save-message`,{
            conversationId,role:"assistant",content:response
        })
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({message:`agent error :${error}`})
    }
}   