import express from 'express';
import chatbotRouter from '../api/chatbot.js';


const chatbot = express.Router();

chatbot.use("/chat", chatbotRouter);

export default chatbot;
