import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  answerText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const questionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  question: { type: String, required: true },
  tags: { type: [String], default: [] },
  answers: [answerSchema], // Array to store multiple answers
  createdAt: { type: Date, default: Date.now },
});

// Add text index for full-text search
questionSchema.index({ question: 'text', tags: 'text' });

// Add indexes for frequently queried fields
questionSchema.index({ userId: 1 });
questionSchema.index({ createdAt: -1 }); // For sorting by newest
questionSchema.index({ tags: 1 }); // For tag filtering

export default mongoose.model("Question", questionSchema);
