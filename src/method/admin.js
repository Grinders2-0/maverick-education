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
    // A simple logout endpoint that doesn't require server-side action
    // since JWT tokens are stateless
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong during logout",
      error: error.message,
    });
  }
};

export const getAllStudentsData = async (req, res) => {
  try {
    console.log("getAllStudentsData endpoint called");
    const User = await import('../models/User.js');
    const CollegeInfo = await import('../models/registration/collegeInfo.js');
    const Result = await import('../models/registration/resultdata_fetch.js');
    const UserSubject = await import('../models/registration/studentSubject.js');
    
    // Get all users with role 'user' (students)
    const students = await User.default.find({ role: 'user' }).select('fName lName email isDeleted');
    console.log(`Found ${students.length} students`);
    
    // Create an array to hold the complete student data
    const studentsData = [];
    
    // For each student, gather their related data
    for (const student of students) {
      const studentData = {
        id: student._id,
        name: `${student.fName} ${student.lName || ''}`.trim(),
        email: student.email,
        isDeleted: student.isDeleted,
        college: null,
        cgpa: null,
        currentSubjects: []
      };
      
      // Get college information
      const collegeInfo = await CollegeInfo.default.findOne({ userId: student._id }).sort({ createdAt: -1 });
      if (collegeInfo) {
        studentData.college = {
          name: collegeInfo.collegeName,
          department: collegeInfo.department,
          semester: collegeInfo.semester,
          enrollmentYear: collegeInfo.enrollmentYear,
          expectedGraduationYear: collegeInfo.expectedGraduationYear,
          enrollmentNumber: collegeInfo.enrollmentNumber
        };
      }
      
      // Get current subjects
      const subjects = await UserSubject.default.findOne({ userId: student._id }).sort({ createdAt: -1 }).populate('selectedSubjects.subjectId');
      if (subjects) {
        studentData.currentSubjects = subjects.selectedSubjects.map(subject => {
          if (subject.subjectId) {
            return {
              name: subject.subjectId.sname,
              code: subject.subjectId.scode
            };
          }
          return null;
        }).filter(Boolean);
      }
      
      // Get CGPA information
      const result = await Result.default.findOne({ userId: student._id }).sort({ createdAt: -1 });
      if (result) {
        studentData.cgpa = result.cgpa;
      }
      
      studentsData.push(studentData);
    }
    
    res.status(StatusCodes.OK).json({
      success: true,
      count: studentsData.length,
      data: studentsData
    });
  } catch (error) {
    console.error("Error fetching student data:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch student data",
      error: error.message
    });
  }
}; 

