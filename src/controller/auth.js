import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors/index.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { email, password, fName, lName, loginType, profileImage } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Create new user
    const newUser = await User.create({
      email,
      password,
      fName,
      lName,
      loginType,
      profileImage,
    });

    // Generate JWT Token
    const token = newUser.createJWT();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        fName: newUser.fName,
        lName: newUser.lName,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password, loginType, isLogin } = req.body;
  console.log("email,", email, password, loginType);
  if (!loginType || !email) {
    throw new BadRequestError("Provide email, fcmToken, loginType");
  }

  if (
    !(loginType == "email" || loginType == "apple" || loginType == "google")
  ) {
    throw new BadRequestError("Unknown loginType");
  }

  let user;
  switch (loginType) {
    case "google":
    case "apple":
      user = await User.findOneAndUpdate(
        { email },
        {
          new: true,
          runValidators: true,
        }
      );
      if (user) {
        const token = user.createJWT();
        user.password = undefined;
        console.log("worked");
        res.status(StatusCodes.OK).json({ user, token, isNewUser: false });
        return;
      }
      break;
    case "email":
      if (!email || !password) {
        throw new BadRequestError("Provide email and password!");
      }
      user = await User.findOneAndUpdate(
        { email },
        {
          new: true,
          runValidators: true,
        }
      );
      if (user) {
        if (!isLogin) {
          throw new BadRequestError("User Already Exits Try Login!");
        }
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
          console.log("incorre");
          throw new UnauthenticatedError("Invalid Credentials!");
        }
        const token = user.createJWT();
        user.password = undefined;
        res.status(StatusCodes.OK).json({ user, token, isNewUser: false });
        return;
      } else if (isLogin) {
        throw new BadRequestError("User Not Found!");
      }
      break;
    default:
      throw new BadRequestError("Unknown loginType");
  }
  user = await User.create(req.body);
  user.password = undefined;
  const token = user.createJWT();
  console.log("data", user);
  res.status(StatusCodes.CREATED).json({ user, token, isNewUser: true });
};

const logout = async (req, res) => {
  try {
    const { userId } = req.user;
    
    // Update the user's lastLogin field (useful for security monitoring)
    await User.findByIdAndUpdate(
      userId, 
      { 
        fcmToken: "",  // Clear FCM token
        lastLogin: new Date() // Update last login time
      },
      { new: true }
    );
    
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error during logout"
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.userId;

    if (!oldPassword || !newPassword) {
      throw new BadRequestError("Please provide both old and new password");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid old password");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Password changed successfully"
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message
    });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new BadRequestError("Please provide email");
    }
    
    const userData = await User.findOneAndDelete({ email: email });
    if (!userData) {
      throw new NotFoundError(`No user found with email ${email}`);
    }

    res.status(StatusCodes.OK).json({ 
      success: true,
      message: "Account deleted successfully" 
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message
    });
  }
};

const webDeleteAccount = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError("Please provide email and password");
    }

    const userData = await User.findOne({ email: email });
    if (!userData) {
      throw new NotFoundError(`No user found with email ${email}`);
    }

    const isPasswordCorrect = await userData.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid password");
    }

    await User.findOneAndDelete({ email: email });
    res.status(StatusCodes.OK).json({ 
      success: true,
      message: "Account deleted successfully" 
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message
    });
  }
};

const userAuthorize = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new BadRequestError("Please provide email");
    }

    const userData = await User.findOne({ email: email });
    if (!userData) {
      throw new NotFoundError(`No user found with email ${email}`);
    }

    res.status(StatusCodes.OK).json({ 
      success: true,
      message: "User authorized" 
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { email, fName, lName } = req.body;
    if (!email || !fName) {
      throw new BadRequestError("Please provide email and first name");
    }

    const userData = await User.findOne({ email: email });
    if (!userData) {
      throw new NotFoundError(`No user found with email ${email}`);
    }

    const updatedData = await User.findOneAndUpdate(
      { email: email },
      {
        fName: fName,
        lName: lName,
      },
      { new: true }
    );

    if (updatedData) {
      updatedData.password = undefined;
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: updatedData
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    if (!email || !oldPassword || !newPassword) {
      throw new BadRequestError("Please provide email, old password, and new password");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFoundError(`No user found with email ${email}`);
    }

    // Verify old password
    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid old password");
    }

    // Validate new password format
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
    if (!passwordRegex.test(newPassword)) {
      throw new BadRequestError("New password must contain at least one number and one special character, and be at least 6 characters long");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Use findOneAndUpdate to bypass validation
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true, runValidators: false }
    );

    if (!updatedUser) {
      throw new Error("Failed to update password");
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Password reset successfully"
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message
    });
  }
};

export {
  login,
  logout,
  changePassword,
  deleteAccount,
  userAuthorize,
  webDeleteAccount,
  updateProfile,
  resetPassword
};
