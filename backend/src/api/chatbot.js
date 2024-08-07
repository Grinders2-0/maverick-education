import express from "express";
import {chatbot} from '../method/registration/chatbot.js'
// Now you can use createSubject and getSubjectsBySem in this file.

const chatbotRouter = express.Router();

chatbotRouter.post("/chatbot", chatbot);

export default chatbotRouter;
