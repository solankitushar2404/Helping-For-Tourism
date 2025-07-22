// routes/tripRoutes.js
import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  saveTrip,
  getUserTrips,
  deleteTrip,
} from "../controllers/trip.controller.js";

const router = express.Router();

// Save a new trip
router.post("/", protect, saveTrip);

// Get all trips for the logged-in user
router.get("/", protect, getUserTrips);

// Delete a trip
router.delete("/:id", protect, deleteTrip);

export default router;
