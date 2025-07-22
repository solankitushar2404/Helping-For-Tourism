import mongoose from 'mongoose';

const transportSchema = new mongoose.Schema({
  district: { type: mongoose.Schema.Types.ObjectId, ref: 'District', required: true },
  mode: { type: String, enum: ['air', 'train', 'bus'], required: true },
  name: String,
  from: String,
  time: String,
  link: String,
}, { timestamps: true });

export default mongoose.model('Transport', transportSchema);