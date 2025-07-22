// backend/controllers/admin.controller.js
import District from '../models/District.js';
import Place from '../models/Place.js';
import Hotel from '../models/Hotel.js';
import Event from '../models/Event.js';
import Transport from '../models/Transport.js';
import User from '../models/User.js';
import Review from '../models/Review.js';

// Common CRUD Controller Template
const createItem = (Model) => async (req, res) => {
  try {
    const item = new Model(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllItems = (Model) => async (req, res) => {
  try {
    const items = await Model.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateItem = (Model) => async (req, res) => {
  try {
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteItem = (Model) => async (req, res) => {
  try {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  createDistrict: createItem(District),
  getAllDistricts: getAllItems(District),
  updateDistrict: updateItem(District),
  deleteDistrict: deleteItem(District),

  createPlace: createItem(Place),
  getAllPlaces: getAllItems(Place),
  updatePlace: updateItem(Place),
  deletePlace: deleteItem(Place),

  createHotel: createItem(Hotel),
  getAllHotels: getAllItems(Hotel),
  updateHotel: updateItem(Hotel),
  deleteHotel: deleteItem(Hotel),

  createEvent: createItem(Event),
  getAllEvents: getAllItems(Event),
  updateEvent: updateItem(Event),
  deleteEvent: deleteItem(Event),

  createTransport: createItem(Transport),
  getAllTransports: getAllItems(Transport),
  updateTransport: updateItem(Transport),
  deleteTransport: deleteItem(Transport),

  // Optional for user and reviews (admin level access)
  getAllUsers: getAllItems(User),
  deleteUser: deleteItem(User),
  getAllReviews: getAllItems(Review),
  deleteReview: deleteItem(Review),
};