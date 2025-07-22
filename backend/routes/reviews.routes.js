import express from "express";
import {
  createReview,
  getUserReviews,
  getAllReviews,
  getReviewsByTarget,
  deleteReview,
  updateReview
} from "../controllers/review.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createReview);
router.get("/", protect, getUserReviews);
router.get("/all", protect, getAllReviews);
router.get("/target", getReviewsByTarget); // ✅ Public access for district page
router.delete("/:id", protect, deleteReview);
router.put("/:id", protect, updateReview);

export default router;
