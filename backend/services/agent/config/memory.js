import { redis } from "../../../shared/redis/redis.js"
import { getMessages } from "../util/getMessages.js"

export const getMemory = async (conversationId) => {
    const key = `messages-${conversationId}`

    try {
        const cached = await redis.get(key)
        if (cached) {
            const parsed = JSON.parse(cached)
            return Array.isArray(parsed) ? parsed : []
        }
    } catch (error) {
        console.error("redis memory read failed:", error.message)
    }

    try {
        const messages = await getMessages(conversationId)
        const safeMessages = Array.isArray(messages) ? messages : []
        await redis.set(key, JSON.stringify(safeMessages), "EX", 24 * 60 * 60)
        return safeMessages
    } catch (error) {
        console.error("memory fallback failed:", error.message)
        return []
    }
}

// new message other than the memory or staore message should be add into redis or memory

// we would set limit of  20 messages in redis store if new one is added then
// the most one message is deleted and the new messagae is addded at 20th place and 1st is deleted
export const addMessage = async (conversationId, role, content) => {
    const key = `messages-${conversationId}`

    try {
        const rawMessages = await redis.get(key)
        const parsedMessages = rawMessages ? JSON.parse(rawMessages) : []
        const messages = Array.isArray(parsedMessages) ? parsedMessages : []

        messages.push({ role, content })

        if (messages.length > 20) {
            messages.shift()
        }

        await redis.set(key, JSON.stringify(messages))
    } catch (error) {
        console.error("redis memory write failed:", error.message)
    }
}