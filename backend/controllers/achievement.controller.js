import Achievement from "../models/Achievement.js";
import Review from "../models/Review.js";
import User from "../models/User.js";

export const getReviewAchievements = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalReviews = await Review.countDocuments({ user: userId });
    const fiveStarReviews = await Review.countDocuments({ user: userId, rating: 5 });

    const reviewedPlace = await Review.exists({ user: userId, targetType: "Place" });
    const reviewedHotel = await Review.exists({ user: userId, targetType: "Hotel" });
    const reviewedEvent = await Review.exists({ user: userId, targetType: "Event" });
    const hasReviewedAllTypes = reviewedPlace && reviewedHotel && reviewedEvent;

    await evaluateReviewAchievements(userId, totalReviews, hasReviewedAllTypes);
    await evaluateDateAchievements(userId);
    await evaluateStreakAchievements(userId);

    const achievements = await Achievement.find({ userId });

    res.json({
      totalReviews,
      fiveStarReviews,
      hasReviewedAllTypes,
      achievements,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const evaluateReviewAchievements = async (userId, count, hasAllTypes) => {
  const levels = [
    { threshold: 1, level: "bronze", title: "First Review", description: "Wrote your first review!" },
    { threshold: 5, level: "silver", title: "Reviewer", description: "Wrote 5 reviews!" },
    { threshold: 10, level: "gold", title: "Master Reviewer", description: "Wrote 10 reviews!" }
  ];

  const existing = await Achievement.find({ userId, type: "review" });
  const existingLevels = existing.map(a => a.level);

  for (const lvl of levels) {
    if (count >= lvl.threshold && !existingLevels.includes(lvl.level)) {
      await Achievement.create({
        userId,
        type: "review",
        level: lvl.level,
        title: lvl.title,
        description: lvl.description,
        icon: `/icons/${lvl.level}_review.png`,
      });
    }
  }

  if (hasAllTypes && !existingLevels.includes("diverse")) {
    await Achievement.create({
      userId,
      type: "review",
      level: "diverse",
      title: "Diverse Reviewer",
      description: "Reviewed a place, hotel, and event!",
      icon: "/icons/diverse_review.png",
    });
  }
};

const evaluateDateAchievements = async (userId) => {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;

  const specialDates = [
    { day: 1, month: 1, level: "newyear", title: "New Year's Reviewer", icon: "/icons/newyear.png" },
    { day: 25, month: 12, level: "christmas", title: "Christmas Reviewer", icon: "/icons/christmas.png" },
  ];

  for (const date of specialDates) {
    const exists = await Achievement.exists({ userId, type: "date", level: date.level });
    if (day === date.day && month === date.month && !exists) {
      await Achievement.create({
        userId,
        type: "date",
        level: date.level,
        title: date.title,
        description: `You wrote a review on ${date.title.split(" ")[0]}!`,
        icon: date.icon,
      });
    }
  }
};

const evaluateStreakAchievements = async (userId) => {
  const reviews = await Review.find({ user: userId }).sort({ createdAt: -1 });

  let streak = 1;
  for (let i = 1; i < reviews.length; i++) {
    const prevDate = new Date(reviews[i - 1].createdAt);
    const currentDate = new Date(reviews[i].createdAt);
    const diffDays = Math.abs(prevDate - currentDate) / (1000 * 3600 * 24);

    if (diffDays <= 1.5) {
      streak++;
    } else {
      break;
    }
  }

  const existing = await Achievement.find({ userId, type: "streak" });
  const existingLevels = existing.map(a => a.level);

  const levels = [
    { threshold: 3, level: "streak-bronze", title: "3-Day Streak", description: "Reviewed 3 days in a row!" },
    { threshold: 5, level: "streak-silver", title: "5-Day Streak", description: "Reviewed 5 days in a row!" },
    { threshold: 7, level: "streak-gold", title: "7-Day Streak", description: "Reviewed a whole week!" },
  ];

  for (const lvl of levels) {
    if (streak >= lvl.threshold && !existingLevels.includes(lvl.level)) {
      await Achievement.create({
        userId,
        type: "streak",
        level: lvl.level,
        title: lvl.title,
        description: lvl.description,
        icon: `/icons/${lvl.level}.png`,
      });
    }
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Review.aggregate([
      {
        $group: {
          _id: "$user",
          reviewCount: { $sum: 1 }
        }
      },
      { $sort: { reviewCount: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          reviewCount: 1,
          user: {
            username: "$user.username",
            avatar: "$user.avatar"
          }
        }
      }
    ]);

    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

