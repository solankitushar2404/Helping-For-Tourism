import express from "express";
import { createTransport, updateTransport, deleteTransport } from "../controllers/adminTransport.controllers.js";
import { protect, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, isAdmin, createTransport);
router.put("/:id", protect, isAdmin, updateTransport);
router.delete("/:id", protect, isAdmin, deleteTransport);

export default router;
