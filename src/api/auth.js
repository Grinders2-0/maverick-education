import express from "express";
const router = express.Router();
import authenticateUser from "../middleware/authentication.js";
import {
  changePassword,
  sendMailOtp,
  login,
  logout,
  deleteAccount,
  verifyOtp,
  resetPassword,
  userAuthorize,
  webDeleteAccount,
  updateProfile,
  signup
} from "../controller/auth.js";

router.post("/signup", signup);
router.post("/login", login);
router.patch("/logout", authenticateUser, logout);
router.post("/forgotPassword/sendMail", sendMailOtp);
router.post("/forgotPassword/verifyOtp", verifyOtp);
router.post("/forgotPassword/resetPassword", resetPassword);
router.post("/changePassword", authenticateUser, changePassword);
router.post("/deleteAccount", authenticateUser, deleteAccount);
router.post("/webDeleteAccount", webDeleteAccount);
router.post("/userAuthorize", authenticateUser, userAuthorize);
router.post("/updateProfile", updateProfile);

export default router;
