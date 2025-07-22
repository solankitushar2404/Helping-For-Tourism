import mongoose from 'mongoose';
import Transport from '../models/Transport.js';

export const getTransportByDistrict = async (req, res) => {
  const { district } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(district)) {
      return res.status(400).json({ message: 'Invalid district ID' });
    }

    const transport = await Transport.find({ district: new mongoose.Types.ObjectId(district) });

    res.status(200).json(transport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch transport', error });
  }
};


export const createTransport = async (req, res) => {
  try {
    const newTransport = new Transport(req.body);
    await newTransport.save();
    res.status(201).json(newTransport);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to create transport', error });
  }
};
