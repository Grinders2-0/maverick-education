import mongoose from "mongoose";

const chatbotSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false  // Changed to false to maintain backward compatibility
  },
  userMessage: { 
    type: String, 
    required: true 
  },
  botResponse: { 
    type: String, 
    required: true 
  }
}, { 
  timestamps: true,
  strict: false  // Added to be more flexible with existing data
});

// Ensure index on userId for better query performance
chatbotSchema.index({ userId: 1 });
chatbotSchema.index({ createdAt: -1 });

const Chatbot = mongoose.model("Chatbot", chatbotSchema);

export default Chatbot; 