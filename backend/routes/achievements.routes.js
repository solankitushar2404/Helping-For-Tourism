import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getReviewAchievements, getLeaderboard } from "../controllers/achievement.controller.js";

const router = express.Router();

router.get("/reviews", protect, getReviewAchievements);
router.get("/leaderboard", protect, getLeaderboard);

export default router;
