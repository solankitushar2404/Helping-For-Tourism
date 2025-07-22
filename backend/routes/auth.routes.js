import express from "express";
import {
    register,
    login,
    forgotPassword,
    resetPassword,
    verifyOtp  , // ✅ lowercase "Otp"
    getProfile
  } from "../controllers/auth.controller.js";  
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getProfile);

// OTP-based flow
router.post("/forgot-password", forgotPassword);      // send OTP
router.post("/verify-otp", verifyOtp);                // verify OTP
router.post("/reset-password", resetPassword);        // reset password after OTP

export default router;
