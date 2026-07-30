import React from 'react'
import api from '../api/axios.js'

export async function getMessages(id) {
  try {
    const { data } = await api.get(`/api/chat/get-messages/${id}`)
    if (Array.isArray(data)) return data
    if (data?.messages) return data.messages
    return []
  } catch (error) {
    console.error(error)
    return []
  }
}

// export default getMessages
