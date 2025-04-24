import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";
import Admin from "../models/Admin.js";

const authenticateAdmin = async (req, res, next) => {
  // Check for auth header
  const authHeader = req.headers.authorization;
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
    
    // Verify this is an admin token
    if (!payload.adminId || payload.role !== "admin") {
      throw new UnauthenticatedError("Not authorized as admin");
    }
    
    // Check if admin exists and is not deleted
    const admin = await Admin.findById(payload.adminId);
    if (!admin || admin.isDeleted) {
      throw new UnauthenticatedError("Admin account not found or deactivated");
    }
    
    // Attach admin info to request
    req.admin = { 
      adminId: payload.adminId,
      role: payload.role
    };
    
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }
};

export default authenticateAdmin; 