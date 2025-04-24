import express from "express";
import { createSubject, getSubjectsBySem } from "../method/registration/selectedSubjects.js";
import { adminSignup, adminLogin, adminLogout } from "../method/admin.js";
import authenticateAdmin from "../middleware/adminAuthentication.js";
import { cacheMiddleware } from "../utility/cache.js";

const adminrouter = express.Router();

// Public admin routes - no authentication required
adminrouter.post("/signup", adminSignup);
adminrouter.post("/login", adminLogin);

// Protected admin routes - admin authentication required
adminrouter.post("/logout", authenticateAdmin, adminLogout);
adminrouter.post("/subjects", authenticateAdmin, createSubject);

// Cache subjects for 10 minutes (600 seconds)
adminrouter.get("/subjects", cacheMiddleware(600), getSubjectsBySem);

export default adminrouter;
