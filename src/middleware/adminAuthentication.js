import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";
import Admin from "../models/Admin.js";

const authenticateAdmin = async (req, res, next) => {
  console.log("Admin authentication middleware called");
  
  // Check for auth header
  const authHeader = req.headers.authorization;
  console.log("Auth header:", authHeader ? "Present" : "Missing");
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  try {
    // Verify token
    const token = authHeader.split(" ")[1];
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET environment variable not defined");
    }
    
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token payload:", payload);
    
    // More flexible approach to handle different token structures
    let adminId;
    
    // Check for adminId directly or userId with admin role
    if (payload.adminId) {
      adminId = payload.adminId;
    } else if (payload.userId && payload.role === "admin") {
      adminId = payload.userId;
    } else {
      console.log("Token missing adminId or userId with admin role");
      throw new UnauthenticatedError("Not authorized as admin");
    }
    
    // Check if admin exists in admin collection
    let admin = await Admin.findById(adminId);
    
    // If not found in Admin model, check User model for admin role
    if (!admin) {
      const User = await import('../models/User.js');
      const user = await User.default.findById(payload.userId || adminId);
      
      if (user && user.role === "admin") {
        // Allow users with admin role
        admin = user;
        adminId = user._id;
      } else {
        throw new UnauthenticatedError("Admin account not found");
      }
    }
    
    if (admin.isDeleted) {
      throw new UnauthenticatedError("Admin account deactivated");
    }
    
    // Attach admin info to request
    req.admin = { 
      adminId: adminId,
      role: "admin"
    };
    
    console.log("Admin authenticated:", req.admin);
    next();
  } catch (error) {
    console.error("Admin authentication error:", error.message);
    throw new UnauthenticatedError("Not authorized to access this route");
  }
};

export default authenticateAdmin; 