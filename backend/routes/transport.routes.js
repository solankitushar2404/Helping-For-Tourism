import express from 'express';
import { protect, isAdmin } from "../middleware/auth.middleware.js"; // ✅ Add this line
import {
  getTransportByDistrict,
  createTransport
} from '../controllers/transport.controller.js';

const router = express.Router();

// Get transport by district
router.get('/:district', getTransportByDistrict); 

// 🔐 Protected: Only admins can add a transport
router.post('/', protect, isAdmin, createTransport);                

export default router;