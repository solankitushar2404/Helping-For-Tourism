import mongoose from 'mongoose';
import Hotel from '../models/Hotel.js';

// GET all hotels for a district
export const getHotelsByDistrict = async (req, res) => {
  const { district } = req.query;
  try {
    const hotels = await Hotel.find({ district: new mongoose.Types.ObjectId(district) });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch hotels', error });
  }
};

// POST new hotel (admin)
export const createHotel = async (req, res) => {
  try {
    const newHotel = new Hotel(req.body);
    await newHotel.save();
    res.status(201).json(newHotel);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create hotel', error });
  }
};