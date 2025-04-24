import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Initialize Gemini Pro with API Key
const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  console.error("GOOGLE_API_KEY environment variable is not defined!");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export const chatbot = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ 
        success: false,
        message: "Prompt is required" 
      });
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ 
      success: true,
      message: "Response generated successfully",
      response: text 
    });
  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({ 
      success: false,
      message: "Error generating response", 
      error: error.message 
    });
  }
};
