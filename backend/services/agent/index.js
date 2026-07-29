import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import cors from "cors"
import agentRouter from "./routes/agent.route.js"
dotenv.config()
const app = express();
const port = process.env.PORT||8000


app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/",agentRouter)


app.get("/",(req,res)=>{

     res.json({message:"hello from agent"})
})

app.listen(port,()=>{
    console.log(`agent is started at: ${port}`)
    connectDB()
})