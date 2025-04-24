import express from "express";
import authenticateUser from "../middleware/authentication.js";
import {
  addQuestion,
  getAllQuestions,
  searchQuestion,
  getUserQuestions,
  addAnswer,
  
} from "../controller/questionController.js";

const router = express.Router();

router.post("/add", authenticateUser, addQuestion); // Add a new question
router.get("/all", getAllQuestions); // Get all questions
router.get("/search", searchQuestion); // Search a question
router.get("/my-questions", authenticateUser, getUserQuestions); // Get user's questions

router.post("/answer", authenticateUser, addAnswer); // Add an answer to a question

export default router;
