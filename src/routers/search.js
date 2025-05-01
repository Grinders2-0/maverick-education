import express from "express";
import { searchQuestions, searchStudyMaterials, combinedSearch } from "../controller/searchController.js";
import authenticateUser from "../middleware/authentication.js";

const router = express.Router();

// Search questions
router.get("/questions", authenticateUser, searchQuestions);

// Search study materials
router.get("/materials", authenticateUser, searchStudyMaterials);

// Combined search
router.get("/combined", authenticateUser, combinedSearch);

export default router;
