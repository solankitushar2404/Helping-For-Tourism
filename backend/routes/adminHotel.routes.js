import express from "express";
import {
  createHotel,
  updateHotel,
  deleteHotel,
} from "../controllers/adminHotel.controllers.js";
import { protect, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:districtId", protect, isAdmin, createHotel);
router.put("/:hotelId", protect, isAdmin, updateHotel);
router.delete("/:hotelId", protect, isAdmin, deleteHotel);

export default router;

