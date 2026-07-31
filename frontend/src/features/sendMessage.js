import api from "../api/axios.js";

async function sendMessage(payload) {
  try {
    const body = {
      prompt: payload.prompt,
      conversationId: payload.conversationId,
      agent: payload.agent,
    };

    const { data } = await api.post("/api/agent/chat", body);

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default sendMessage;