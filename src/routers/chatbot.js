import express from "express";
import { chatbot, getUserChatHistory } from "../controller/chatbotcontroller.js";
import authenticateUser from "../middleware/authentication.js";

const router = express.Router();

// Protected routes - require authentication
router.post("/chatbot", authenticateUser, chatbot);
router.get("/chatbot/history", authenticateUser, getUserChatHistory);

export default router;
