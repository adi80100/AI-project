import axios from "axios";
import { graph } from "../graph/graph.js";
import { addMessage } from "../config/memory.js";
import { redis } from "../../../shared/redis/redis.js";

export const agent = async (req, res) => {
    try {
        const { prompt, conversationId, agent } = req.body;

        // await redis.del(`messages-${conversationId}`);

        // Save user message
        await axios.post(`${process.env.CHAT_SERVICE_URL}/save-message`, {
            conversationId,
            role: "user",
            content: prompt,
        });

        const result = await graph.invoke({
            prompt,
            conversationId,
            agent,
        });

        const response = {
            answer:
                typeof result?.aiResponse === "string"
                    ? result.aiResponse
                    : JSON.stringify(result),
            images: result?.images || [],
        };

        // Update Redis memory
        await addMessage(conversationId, "user", prompt);
        await addMessage(conversationId, "assistant", response.answer);

        // Save assistant message
        await axios.post(`${process.env.CHAT_SERVICE_URL}/save-message`, {
            conversationId,
            role: "assistant",
            content: response.answer,
            images: response.images,
        });

        return res.status(200).json(response);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: error.message,
        });
    }
};