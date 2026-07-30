import { redis } from "../../../shared/redis/redis.js"

export const getMemory = async(conversationId)=>{
    const key = `messages-${conversationId}`
    await redis.get
}