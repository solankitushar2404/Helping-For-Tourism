import express from 'express';
import {
  getPlacesByDistrict,
  createPlace
} from '../controllers/places.controller.js';

import { protect, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get('/', getPlacesByDistrict);

// 🔐 Protected: Only admins can add a place
router.post('/', protect, isAdmin, createPlace);

export default router;