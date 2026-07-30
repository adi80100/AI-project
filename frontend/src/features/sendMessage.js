import React from 'react'
import api from '../api/axios'

async function sendMessage(payload) {
  try {
    const body = {
      prompt: payload?.prompt,
      conversationId: payload?.conversationId ?? payload?.conversation,
    }

    const { data } = await api.post("/api/agent/chat", body)

    if (typeof data === 'string') return data
    if (data?.content) return data.content
    if (data?.message) return data.message
    if (data?.aiResponse) return data.aiResponse

    return ''
  } catch (error) {
    console.error(error)
    return ''
  }
}

export default sendMessage
