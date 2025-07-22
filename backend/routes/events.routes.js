import express from 'express';
import { protect, isAdmin } from "../middleware/auth.middleware.js";
import {
  getEventsByDistrict,
  createEvent
} from '../controllers/events.controller.js';

const router = express.Router();

router.get('/', getEventsByDistrict);       

// 🔐 Protected: Only admins can add a event
router.post('/', protect, isAdmin, createEvent);

export default router;