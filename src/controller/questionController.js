import Question from "../models/Question.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import mongoose from "mongoose";


// 🔹 POST: Add a new question

export const addQuestion = async (req, res) => {
  try {
    const { question, tags } = req.body;

    if (!req.user || !req.user.userId) {
      return res.status(401).json({ msg: "User not authenticated" });
    }

    if (!question) {
      return res.status(400).json({ msg: "Question is required" });
    }

    const newQuestion = new Question({
      userId: req.user.userId, // Get user ID from authenticated request
      question,
      tags: tags || [],
    });

    await newQuestion.save();

    // console.log("Question added successfully:", newQuestion);

    res.status(201).json({ msg: "Question added successfully", question: newQuestion });
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};


// 🔹 GET: Fetch all questions with pagination
export const getAllQuestions = async (req, res) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Count total documents for pagination info
    const total = await Question.countDocuments();
    
    // Query with pagination
    const questions = await Question.find()
      .populate("userId", "fName lName email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.status(200).json({
      success: true,
      message: "Questions fetched successfully",
      count: questions.length,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        limit,
        hasNextPage,
        hasPrevPage
      },
      questions
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ 
      success: false,
      message: "Error fetching questions", 
      error: error.message 
    });
  }
};

// 🔹 GET: Search for a specific question
export const searchQuestion = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const questions = await Question.find({
      question: { $regex: query, $options: "i" }, // Case-insensitive search
    });

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 GET: Fetch questions asked by logged-in student
export const getUserQuestions = async (req, res) => {
  try {
    const userQuestions = await Question.find({ userId: req.user.userId });
    res.status(200).json(userQuestions);
  } catch (error) {
    console.error("Error fetching user questions:", error);
    res.status(500).json({ error: error.message });
  }
};


// Add an Answer to a Question
export const addAnswer = async (req, res) => {
    const { questionId, answerText } = req.body;
  
    if (!questionId || !answerText) {
      throw new BadRequestError("Question ID and answer text are required");
    }
  
    // Check if questionId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      return res.status(400).json({ msg: "Invalid question ID format" });
    }
  
    console.log("Searching for question with ID:", questionId);
  
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ msg: `No item found with id: ${questionId}` });
    }
  
    const newAnswer = {
      userId: req.user.userId,
      answerText,
    };
  
    question.answers.push(newAnswer);
    await question.save();
  
    res.status(201).json({ message: "Answer added successfully", question });
  };