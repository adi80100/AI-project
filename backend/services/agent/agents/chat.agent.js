import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages"
import { getModel } from "../config/llmmodels.js"
import { getMemory } from "../config/memory.js"

export const chatAgent = async (state) => {
    try {
        const llm = await getModel("chat")
        const history = await getMemory(state.conversationId)
        
        const searchContext = state.searchResults?`Web Search Results:
        ${JSON.stringify(state.searchResults)}  
        Answer the user using only the above search results
        `:""
        
        const systemPrompt = `You are Unified Ai-Workspace, an intelligent AI assistant.

        ${searchContext}

        If searchContext exists:
I
-Use search results to answer.
-Do not mention internal tools.

Rules:
For simple questions, greetings, and short queries, respond naturally in plain text.
For technical, educational, coding, or detailed topics, use clean Markdown.

Formatting:
- Use # for titles and ## for sections.
- Leave a blank line after headings.
- Use bullet points for lists.
- Use numbered lists for steps.
- Use fenced code blocks with language tags for code.
- Keep paragraphs short and readable.
- Never write headings and content on the same line.
- Never generate large walls of text.`

        const messages = [new SystemMessage(systemPrompt)]

        ;(history || []).forEach((msg) => {
            if (msg?.role === "user" && msg?.content) {
                messages.push(new HumanMessage(msg.content))
            }
            if (msg?.role === "assistant" && msg?.content) {
                messages.push(new AIMessage(msg.content))
            }
        })

        messages.push(new HumanMessage(state.prompt))

        const response = await llm.invoke(messages)

        const content = typeof response?.content === 'string'
            ? response.content
            : typeof response?.text === 'string'
                ? response.text
                : JSON.stringify(response)


        return {
            ...state,
            aiResponse: content
        }
    } catch (error) {
        console.error("chat agent error:", error)
        return {
            ...state,
            aiResponse: "Sorry, I could not generate a response right now."
        }
    }
}

// now all this response of all human and assistance are storeed for a paricular 
// convestion not for all conversation 
// if we asked him what is my name so it would prsent for that particular
// conversation 