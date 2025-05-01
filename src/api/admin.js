import express from "express";
import { createSubject, getSubjectsBySem } from "../method/registration/selectedSubjects.js";
import { adminSignup, adminLogin, adminLogout, getAllStudentsData } from "../method/admin.js";
import authenticateAdmin from "../middleware/adminAuthentication.js";
import { cacheMiddleware } from "../utility/cache.js";

const adminrouter = express.Router();

// Public admin routes - no authentication required
adminrouter.post("/signup", adminSignup);
adminrouter.post("/login", adminLogin);

// Protected admin routes - admin authentication required
adminrouter.post("/logout", authenticateAdmin, adminLogout);
adminrouter.post("/subjects", authenticateAdmin, createSubject);

// Add a specific debug route for testing
adminrouter.get("/test", (req, res) => {
  res.status(200).json({ success: true, message: "Admin router is working" });
});

// Add students route
adminrouter.get("/students", authenticateAdmin, getAllStudentsData);

// Cache subjects for 10 minutes (600 seconds)
adminrouter.get("/subjects", cacheMiddleware(600), getSubjectsBySem);

// Add test routes to debug without authentication
adminrouter.get("/debug/test", (req, res) => {
  res.status(200).json({ success: true, message: "Admin debug route working" });
});

adminrouter.get("/debug/students", async (req, res) => {
  try {
    const User = await import('../models/User.js');
    const students = await User.default.find({ role: 'user' }).select('fName lName email isDeleted');
    
    res.status(200).json({
      success: true,
      count: students.length,
      data: students.map(s => ({ 
        id: s._id, 
        name: `${s.fName} ${s.lName || ''}`.trim(),
        email: s.email,
        isDeleted: s.isDeleted
      }))
    });
  } catch (error) {
    console.error("Debug error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

adminrouter.get("/debug/subjects", async (req, res) => {
  try {
    const { sem } = req.query || "1";
    const Subject = await import('../models/registration/SUBJECTS.js');
    const subjects = await Subject.default.find({ sem, isDeleted: false });
    
    res.status(200).json({
      success: true,
      count: subjects.length,
      data: subjects
    });
  } catch (error) {
    console.error("Debug subjects error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add debug route for creating subject
adminrouter.post("/debug/subjects", async (req, res) => {
  try {
    const { sname, scode, sem } = req.body;
    
    if (!sname || !scode || !sem) {
      return res.status(400).json({ 
        success: false,
        message: "All required fields must be provided",
        requiredFields: ["sname", "scode", "sem"]
      });
    }
    
    const Subject = await import('../models/registration/SUBJECTS.js');
    
    // Check if subject already exists
    const existingSubject = await Subject.default.findOne({ scode, sem });
    if (existingSubject) {
      return res.status(409).json({
        success: false,
        message: `Subject with code ${scode} already exists in semester ${sem}`
      });
    }
    
    // Create new subject
    const newSubject = new Subject.default({ sname, scode, sem });
    const subjectData = await newSubject.save();
    
    res.status(201).json({ 
      success: true,
      message: "Subject added successfully", 
      subject: subjectData 
    });
  } catch (error) {
    console.error("Debug create subject error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Log all registered routes for debugging
adminrouter._router = adminrouter;
adminrouter.stack = adminrouter._router.stack;

const routes = adminrouter.stack.map(layer => {
  if (layer.route) {
    return {
      path: layer.route.path,
      methods: Object.keys(layer.route.methods)
    };
  }
}).filter(Boolean);

console.log("Admin router initialized with routes:", JSON.stringify(routes, null, 2));

export default adminrouter;
