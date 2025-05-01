import express from "express";
import { createSubject, getSubjectsBySem } from "../method/registration/selectedSubjects.js";
import authenticateAdmin from "../middleware/adminAuthentication.js";
import { cacheMiddleware } from "../utility/cache.js";

const subjectRouter = express.Router();

// Admin routes for subjects
subjectRouter.post("/", authenticateAdmin, createSubject);

// Public routes for subjects
// Cache subjects for 10 minutes (600 seconds)
subjectRouter.get("/", cacheMiddleware(600), getSubjectsBySem);

export default subjectRouter; 