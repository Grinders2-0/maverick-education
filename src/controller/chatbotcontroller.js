import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import Chatbot from "../models/chatbot.js";
import User from "../models/User.js";

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
    const userId = req.user ? req.user.userId : null;

    if (!prompt) {
      return res.status(400).json({ 
        success: false,
        message: "Prompt is required" 
      });
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Save the chat interaction to the database
    const chatInteraction = new Chatbot({
      userId: userId, // Will be null for unauthenticated users
      userMessage: prompt,
      botResponse: text
    });
    await chatInteraction.save();

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

// API to fetch user's chat history
export const getUserChatHistory = async (req, res) => {
  try {
    const userId = req.user.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }

    // Fetch user information
    const user = await User.findById(userId).select('fName lName email');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Fetch chat history with pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const total = await Chatbot.countDocuments({ userId });

    // Fetch chats for the user
    const chatHistory = await Chatbot.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Format the response
    const formattedChatHistory = chatHistory.map(chat => ({
      id: chat._id,
      userMessage: chat.userMessage,
      botResponse: chat.botResponse,
      timestamp: chat.createdAt
    }));

    res.status(200).json({
      success: true,
      message: "Chat history fetched successfully",
      user: {
        id: user._id,
        name: `${user.fName} ${user.lName}`,
        email: user.email
      },
      count: chatHistory.length,
      pagination: {
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        limit,
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1
      },
      chatHistory: formattedChatHistory
    });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching chat history",
      error: error.message
    });
  }
};
