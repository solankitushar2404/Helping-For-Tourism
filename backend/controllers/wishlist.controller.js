import Wishlist from "../models/Wishlist.js";

// GET /api/wishlist
export const getWishlist = async (req, res) => {
  try {
    const items = await Wishlist.find({ user: req.user.id });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch wishlist", error });
  }
};

// POST /api/wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { placeId, name, imageUrl, description } = req.body;

    const existing = await Wishlist.findOne({
      user: req.user.id,
      placeId,
    });

    if (existing) {
      return res.status(400).json({ message: "Already in wishlist" });
    }

    const newItem = new Wishlist({
      user: req.user.id,
      placeId,
      name,
      imageUrl,
      description, // ✅ Add this
    });

    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Failed to add to wishlist", error });
  }
};

// DELETE /api/wishlist/:id
export const removeFromWishlist = async (req, res) => {
  try {
    const deleted = await Wishlist.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Removed from wishlist", deleted });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove item", error });
  }
};
