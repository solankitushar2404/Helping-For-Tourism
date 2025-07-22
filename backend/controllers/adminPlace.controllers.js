// controllers/adminPlace.controllers.js
import Place from "../models/Place.js";
import District from "../models/District.js";

// controllers/adminPlace.controllers.js

export const getAllAdminPlaces = async (req, res) => {

   try {
    const places = await Place.find().populate('district', 'name state'); // <-- ✅ Fix here
    res.json(places);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch places' });
  }
};

// Create a new place
export const createPlace = async (req, res) => {
  try {
    const { name, description, district, latitude, longitude, image } = req.body;

    if (!name || !description || !district || !latitude || !longitude || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🛠️ Use district ID directly
    const districtDoc = await District.findById(district);
    if (!districtDoc) {
      return res.status(400).json({ message: "District not found" });
    }

    const newPlace = new Place({
      name,
      description,
      image,
      latitude,
      longitude,
      district: districtDoc._id,
    });

    await newPlace.save();
    res.status(201).json({ success: true, data: newPlace });
  } catch (error) {
    console.error("Create Place Error:", error);
    res.status(500).json({ success: false, message: "Failed to create place" });
  }
};

// Update a place
export const updatePlace = async (req, res) => {
  try {
    const { placeId } = req.params;
    const { name, description, district, latitude, longitude, image } = req.body;

    const districtDoc = await District.findOne({ name: new RegExp(`^${district.trim()}$`, "i") });
    if (!districtDoc) {
      return res.status(400).json({ message: "District not found" });
    }

    const updated = await Place.findByIdAndUpdate(
      placeId,
      {
        name,
        description,
        latitude,
        longitude,
        image,
        district: districtDoc._id,
      },
      { new: true }
    );

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error("Update Place Error:", error);
    res.status(500).json({ success: false, message: "Failed to update place" });
  }
};

// Delete a place
export const deletePlace = async (req, res) => {
  try {
    const { placeId } = req.params;
    await Place.findByIdAndDelete(placeId);
    res.status(200).json({ success: true, message: "Place deleted" });
  } catch (error) {
    console.error("Delete Place Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete place" });
  }
};

