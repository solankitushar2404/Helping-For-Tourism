// controllers/adminHotel.controllers.js
import Hotel from "../models/Hotel.js";
import cloudinary from "../utils/cloudinary.js";

export const createHotel = async (req, res) => {
  try {
    const { district, name, type, description, price } = req.body;
    let imageUrl = req.body.image;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: `hotels/${district}`,
      });
      imageUrl = result.secure_url;
    }
    const newHotel = new Hotel({ district, name, type, description, price, image: imageUrl });
    await newHotel.save();
    res.status(201).json({ success: true, data: newHotel });
  } catch (error) {
    console.error("Create Hotel Error:", error);
    res.status(500).json({ success: false, message: "Failed to create hotel" });
  }
};

export const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: `hotels/${updates.district}`,
      });
      updates.image = result.secure_url;
    }
    const updatedHotel = await Hotel.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json({ success: true, data: updatedHotel });
  } catch (error) {
    console.error("Update Hotel Error:", error);
    res.status(500).json({ success: false, message: "Failed to update hotel" });
  }
};

export const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;
    await Hotel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Hotel deleted" });
  } catch (error) {
    console.error("Delete Hotel Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete hotel" });
  }
};