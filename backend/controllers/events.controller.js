import mongoose from "mongoose";
import Event from '../models/Event.js';

// GET all events for a district
export const getEventsByDistrict = async (req, res) => {
  const { district } = req.query;
  try {
    const events = await Event.find({ district: new mongoose.Types.ObjectId(district) });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch events', error });
  }
};

// POST new event (admin)
export const createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create event', error });
  }
};