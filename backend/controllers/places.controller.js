import mongoose from 'mongoose';
import Place from '../models/Place.js';

export const getPlacesByDistrict = async (req, res) => {
  const { district } = req.query;
  try {
    const places = await Place.find({ district: new mongoose.Types.ObjectId(district) });
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch places", error });
  }
};

// POST new place (admin)
export const createPlace = async (req, res) => {
  try {
    const newPlace = new Place(req.body);
    await newPlace.save();
    res.status(201).json(newPlace);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create place', error });
  }
};