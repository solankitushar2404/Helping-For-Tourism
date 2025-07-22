// controllers/tripController.js
import Trip from "../models/Trip.js";

export const saveTrip = async (req, res) => {
  try {
    const { places, distance } = req.body;
    const newTrip = new Trip({
      user: req.user._id,
      places,
      distance,
    });
    await newTrip.save();
    res.json(newTrip);
  } catch (err) {
    console.error("Error saving trip:", err);
    res.status(500).json({ error: "Error saving trip" });
  }
};

export const getUserTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user._id })
      .populate({
        path: "places",
        populate: {
          path: "district", // ⬅️ this gets the district info
          select: "name",   // ⬅️ only select the district name
        },
      });

    res.json(trips);
  } catch (err) {
    console.error("Error fetching trips:", err);
    res.status(500).json({ error: "Error fetching trips" });
  }
};


export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!trip) return res.status(404).json({ error: "Trip not found" });
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting trip:", err);
    res.status(500).json({ error: "Error deleting trip" });
  }
};
