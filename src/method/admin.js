import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import Admin from "../models/Admin.js";

export const adminSignup = async (req, res) => {
  try {
    const { email, name, password, confirmPassword } = req.body;

    // Validate input
    if (!email || !name || !password || !confirmPassword) {
      throw new BadRequestError("Please provide all required fields");
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      throw new BadRequestError("Passwords do not match");
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      throw new BadRequestError("Admin with this email already exists");
    }

    // Create new admin
    const admin = await Admin.create({
      email,
      name,
      password,
    });

    // Generate token
    const token = admin.createJWT();

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Admin created successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
      token,
    });
  } catch (error) {
    if (error instanceof BadRequestError) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
    
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong during signup",
      error: error.message,
    });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      throw new BadRequestError("Please provide email and password");
    }

    // Find admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new UnauthenticatedError("Invalid credentials");
    }

    // Check if admin account is deleted
    if (admin.isDeleted) {
      throw new UnauthenticatedError("This account has been deactivated");
    }

    // Compare password
    const isPasswordCorrect = await admin.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid credentials");
    }

    // Generate token
    const token = admin.createJWT();

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Login successful",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
      token,
    });
  } catch (error) {
    if (error instanceof BadRequestError || error instanceof UnauthenticatedError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong during login",
      error: error.message,
    });
  }
};

export const adminLogout = async (req, res) => {
  try {
    const { adminId } = req.admin;
    
    // Update the admin's lastLogin field
    await Admin.findByIdAndUpdate(
      adminId, 
      { lastLogin: new Date() },
      { new: true }
    );
    
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Admin logged out successfully"
    });
  } catch (error) {
    console.error("Admin logout error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error during admin logout"
    });
  }
}; 