// routes/adminPlace.routes.js
import express from "express";
import {
  getAllAdminPlaces,
  createPlace,
  updatePlace,
  deletePlace,
} from "../controllers/adminPlace.controllers.js";
import { protect, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, isAdmin, getAllAdminPlaces);
router.post("/", protect, isAdmin, createPlace);
router.put("/:placeId", protect, isAdmin, updatePlace);
router.delete("/:placeId", protect, isAdmin, deletePlace);

export default router;
