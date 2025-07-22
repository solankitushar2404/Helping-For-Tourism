import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  district: { type: mongoose.Schema.Types.ObjectId, ref: 'District', required: true },
  name: String,
  location: String,
  image: String,
  start_date: String,
  end_date: String,
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);