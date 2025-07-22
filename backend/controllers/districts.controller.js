import District from '../models/District.js';

// GET all districts (for homepage dropdown)
export const getAllDistricts = async (req, res) => {
  try {
    const districts = await District.find();
    res.json(districts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch districts', error });
  }
};

// GET specific district by name (for district page hero)
export const getDistrictByName = async (req, res) => {
  const { district } = req.params;
  try {
    const data = await District.findOne({ name: { $regex: new RegExp(district, "i") } });
    if (!data) return res.status(404).json({ message: 'District not found' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch district', error });
  }
};

// POST new district (admin use)
export const createDistrict = async (req, res) => {
  try {
    const newDistrict = new District(req.body);
    await newDistrict.save();
    res.status(201).json(newDistrict);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create district', error });
  }
};