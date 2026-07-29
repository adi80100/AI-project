import { Router } from "express";
import { agent } from "../controllers/agent.controller.js";

const router = Router()
router.route("/chat").post(agent)
export default router