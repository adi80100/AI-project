import React from 'react'
import api from '../api/axios.js'

async function logout() {
  try {
    const {data} = await api.get("/api/auth/logout")
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

export default logout
