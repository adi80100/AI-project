import { Router } from "express";
import { createConversation, getAllMessage, getConversations, saveMessage, updateConversation } from "../controllers/chat.controller.js";

const router = Router();

router.route("/create-conversation").get(createConversation)
router.route("/get-conversations").get(getConversations)
router.route("/update-conversation").post(updateConversation)
router.route("/save-message").post(saveMessage)
router.route("/get-messages/:conversationId").get(getAllMessage)

export default router
