import mongoose from "mongoose";

const chatbotSchema = new mongoose.Schema({
  userMessage: { type: String, required: true },
  botResponse: { type: String, required: true },
});

const Chatbot = mongoose.model("Chatbot", chatbotSchema);

export default Chatbot;
