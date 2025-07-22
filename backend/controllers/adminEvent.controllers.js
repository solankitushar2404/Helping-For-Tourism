// controllers/adminEvent.controllers.js
import Event from "../models/Event.js";
import cloudinary from "../utils/cloudinary.js";

export const createEvent = async (req, res) => {
  try {
    const { district, title, description, date } = req.body;
    let imageUrl = req.body.image;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: `events/${district}`,
      });
      imageUrl = result.secure_url;
    }
    const newEvent = new Event({ district, title, description, date, image: imageUrl });
    await newEvent.save();
    res.status(201).json({ success: true, data: newEvent });
  } catch (error) {
    console.error("Create Event Error:", error);
    res.status(500).json({ success: false, message: "Failed to create event" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: `events/${updates.district}`,
      });
      updates.image = result.secure_url;
    }
    const updatedEvent = await Event.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json({ success: true, data: updatedEvent });
  } catch (error) {
    console.error("Update Event Error:", error);
    res.status(500).json({ success: false, message: "Failed to update event" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Event deleted" });
  } catch (error) {
    console.error("Delete Event Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete event" });
  }
};
