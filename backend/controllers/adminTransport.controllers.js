import Transport from "../models/Transport.js";

export const createTransport = async (req, res) => {
  try {
    const newTransport = new Transport(req.body);
    await newTransport.save();
    res.status(201).json({ success: true, data: newTransport });
  } catch (error) {
    console.error("Error creating transport:", error);
    res.status(500).json({ success: false, message: "Failed to create transport" });
  }
};

export const updateTransport = async (req, res) => {
  try {
    const updatedTransport = await Transport.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTransport) {
      return res.status(404).json({ success: false, message: "Transport not found" });
    }

    res.status(200).json({ success: true, data: updatedTransport });
  } catch (error) {
    console.error("Error updating transport:", error);
    res.status(500).json({ success: false, message: "Failed to update transport" });
  }
};

export const deleteTransport = async (req, res) => {
  try {
    const deletedTransport = await Transport.findByIdAndDelete(req.params.id);

    if (!deletedTransport) {
      return res.status(404).json({ success: false, message: "Transport not found" });
    }

    res.status(200).json({ success: true, message: "Transport deleted successfully" });
  } catch (error) {
    console.error("Error deleting transport:", error);
    res.status(500).json({ success: false, message: "Failed to delete transport" });
  }
};
