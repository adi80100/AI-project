import api from "../api/axios.js"

export const getCurrentUser = async ()=>{
    try {
        const {data} = await api.get("/api/me")
        // console.log(data)
        return data
    } catch (error) {
        console.log(error)
        return null
    }
}
