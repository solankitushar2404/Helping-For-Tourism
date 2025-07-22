import Review from "../models/Review.js";

// Utility function to dynamically get the model
const getModel = async (type) => {
  if (type === "Place") return (await import("../models/Place.js")).default;
  if (type === "Hotel") return (await import("../models/Hotel.js")).default;
  if (type === "Event") return (await import("../models/Event.js")).default;
  throw new Error("Invalid targetType");
};

export const createReview = async (req, res) => {
  try {
    const { targetType, targetId, rating, comment } = req.body;
    if (!targetType || !targetId || !rating || !comment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newReview = new Review({
      user: req.user._id,
      targetType,
      targetId,
      rating,
      comment,
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    console.error("Review creation error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/reviews (my reviews)
export const getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user._id }).lean();

    const populated = await Promise.all(
      reviews.map(async (review) => {
        const Model = await getModel(review.targetType);
        const refData = await Model.findById(review.targetId).lean();

        return {
          ...review,
          [review.targetType.toLowerCase()]: refData, // e.g. { place: {...} }
        };
      })
    );

    res.json(populated);
  } catch (err) {
    console.error("Error fetching user reviews:", err);
    res.status(500).json({ error: "Error fetching user reviews" });
  }
};


// GET /api/reviews/all
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate("user", "username avatar email")
      .lean();

    const populated = await Promise.all(
      reviews.map(async (review) => {
        const Model = await getModel(review.targetType);
        const refData = await Model.findById(review.targetId).lean();
        return { ...review, refData };
      })
    );

    res.json(populated);
  } catch (err) {
    console.error("Error fetching all reviews:", err);
    res.status(500).json({ error: "Error fetching all reviews" });
  }
};

// GET /api/reviews/target?targetType=Hotel&targetId=abc123
export const getReviewsByTarget = async (req, res) => {
  try {
    const { targetType, targetId } = req.query;
    if (!targetType || !targetId) {
      return res.status(400).json({ error: "targetType and targetId are required" });
    }

    const reviews = await Review.find({ targetType, targetId })
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .lean();

    res.json(reviews);
  } catch (err) {
    console.error("Error fetching target reviews:", err);
    res.status(500).json({ error: "Error fetching reviews" });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findOne({ _id: id, user: req.user._id });
    if (!review) return res.status(404).json({ message: "Review not found" });

    review.rating = rating;
    review.comment = comment;

    await review.save();
    res.json(review);
  } catch (err) {
    console.error("Error updating review:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!review) return res.status(404).json({ error: "Review not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete review" });
  }
};
