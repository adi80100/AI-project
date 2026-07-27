import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import cors from "cors"
dotenv.config()
const app = express();
const port = process.env.PORT||8000
import chatRoutes from "../chat/routes/chat.routes.js"

app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


app.use("/",chatRoutes)

app.get("/",(req,res)=>{

     res.json({message:"hello from chat"})
})

app.listen(port,()=>{
    console.log(`chat is started at: ${port}`)
    connectDB()
})