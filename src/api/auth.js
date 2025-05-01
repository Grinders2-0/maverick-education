import express from "express";
const router = express.Router();
import authenticateUser from "../middleware/authentication.js";
import {
  changePassword,
  login,
  logout,
  deleteAccount,
  userAuthorize,
  webDeleteAccount,
  updateProfile,
  resetPassword,
  signup
} from "../controller/auth.js";

// Public routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/userAuthorize", userAuthorize);
router.post("/resetPassword",authenticateUser, resetPassword);

// Protected routes (require authentication)
router.post("/logout", authenticateUser, logout);
router.post("/changePassword", authenticateUser, changePassword);
router.post("/deleteAccount", authenticateUser, deleteAccount);
router.post("/webDeleteAccount", authenticateUser, webDeleteAccount);
router.post("/updateProfile", authenticateUser, updateProfile);

export default router;
