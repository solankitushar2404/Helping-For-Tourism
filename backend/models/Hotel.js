import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  district: { type: mongoose.Schema.Types.ObjectId, ref: 'District', required: true },
  name: String,
  image: String,
  price_per_night: Number,
  category: String,
  rating: Number,
  address: String,
}, { timestamps: true });

export default mongoose.model('Hotel', hotelSchema);