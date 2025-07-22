import express from 'express';
import multer from 'multer';
import {
  createDistrict,
  updateDistrict,
  deleteDistrict,
} from '../controllers/adminDistricts.controller.js';

import { protect, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();
const upload = multer(); // Using memory storage for in-memory file buffer

// Admin-only routes
router.post('/', protect, isAdmin, upload.single('image'), createDistrict);
router.put('/:id', protect, isAdmin, upload.single('image'), updateDistrict);
router.delete('/:id', protect, isAdmin, deleteDistrict);

export default router;
