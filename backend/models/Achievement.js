import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["review", "streak", "date"], required: true },
  level: { type: String },
  title: { type: String },
  description: { type: String },
  icon: { type: String },
  dateAchieved: { type: Date, default: Date.now },
});

const Achievement = mongoose.model("Achievement", achievementSchema);
export default Achievement;
