import express from "express";
import {
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/adminEvent.controllers.js";
import { protect, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:districtId", protect, isAdmin, createEvent);
router.put("/:eventId", protect, isAdmin, updateEvent);
router.delete("/:eventId", protect, isAdmin, deleteEvent);

export default router;
