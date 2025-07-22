import express from "express";
import { protect, isAdmin } from "../middleware/auth.middleware.js";
import { getAllDistricts, getDistrictByName, createDistrict } from "../controllers/districts.controller.js";

const router = express.Router();

router.get('/', getAllDistricts);           // For dropdown on home

router.get('/:district', getDistrictByName); // For hero & full info

// 🔐 Protected: Only admins can add a district
router.post('/', protect, isAdmin, createDistrict);

export default router;