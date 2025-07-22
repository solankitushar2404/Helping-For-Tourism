import express from 'express';
import { protect, isAdmin } from "../middleware/auth.middleware.js";
import {
  getHotelsByDistrict,
  createHotel
} from '../controllers/hotels.controller.js';

const router = express.Router();

router.get('/', getHotelsByDistrict);   

// 🔐 Protected: Only admins can add a hotel
router.post('/', protect, isAdmin, createHotel);

export default router;