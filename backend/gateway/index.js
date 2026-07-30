import express from "express"
import dotenv from "dotenv"
import proxy from "express-http-proxy";
import { getCurrentUser } from "./controllers/user.controllers.js";
import { authMiddleware } from "./middleware/auth.middleware.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import { proxyWithHeaders } from "./utils/proxyWithHeaders.js";
import morgan from "morgan";
dotenv.config()
const app = express();
const port = process.env.PORT||8000


app.use(cookieParser())

app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(morgan("dev"))
app.use("/api/auth",proxy(process.env.AUTH_SERVICE_URL))
app.use("/api/chat",authMiddleware,proxyWithHeaders(process.env.CHAT_SERVICE_URL))
app.use("/api/agent",authMiddleware,proxy(process.env.AGENT_SERVICE_URL))

app.get("/api/me",authMiddleware,getCurrentUser)


app.get("/",(req,res)=>{
     res.json({message:"hello from gateway"})
})



app.listen(port,()=>{
    console.log(`gateway started at: ${port}`)
})