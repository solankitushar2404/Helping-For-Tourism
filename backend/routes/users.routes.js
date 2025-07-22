// backend/routes/users.routes.js

import express from "express";
import { updateProfile, changePassword } from "../controllers/user.controller.js";
import { protect, isAdmin } from "../middleware/auth.middleware.js";
import adminController from "../controllers/admin.controller.js"; // Ensure this path is correct

const { getAllUsers } = adminController;
const router = express.Router();

// Protected routes
router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);

router.get("/all", protect, isAdmin, getAllUsers); // Only admins can fetch all users

export default router;
