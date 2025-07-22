import mongoose from 'mongoose';

const districtSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
  },
  name: { type: String, required: true },
  hero: {
    name: String,
    image: String,
    description: String,
  },
}, { timestamps: true });

export default mongoose.model('District', districtSchema);