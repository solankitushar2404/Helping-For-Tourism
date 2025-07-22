import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
  district: { type: mongoose.Schema.Types.ObjectId, ref: 'District', required: true },
  name: String,
  description: String,
  image: String,
  latitude: Number,
  longitude: Number,
}, { timestamps: true });

export default mongoose.model('Place', placeSchema);