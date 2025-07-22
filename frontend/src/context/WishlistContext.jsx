import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext"; // 👈 important

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { token, loading, user } = useAuth(); // 👈 include user for logging/debug

  const fetchWishlist = async () => {
    if (!token) return; // ⛔ Prevent fetch if token is missing
    try {
      const { data } = await axios.get("http://localhost:5000/api/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlist(data);
    } catch (err) {
      console.error("❌ Failed to fetch wishlist:", err.response?.data || err.message);
      toast.error("Failed to load wishlist");
    }
  };

  const addToWishlist = async (item) => {
    if (!token) return toast.error("You must be logged in to use wishlist");

    if (isInWishlist(item.placeId)) {
      toast("Already in wishlist");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/wishlist",
        item,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWishlist((prev) => [...prev, data]);
      toast.success("Added to wishlist ❤️");
    } catch (err) {
      console.error("❌ Failed to add to wishlist:", err.response?.data || err.message);
      toast.error("Could not add to wishlist");
    }
  };

  const removeFromWishlist = async (placeId) => {
    if (!token) return toast.error("Unauthorized");

    const item = wishlist.find((w) => w.placeId === placeId);
    if (!item) {
      toast.error("Item not found in wishlist");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/wishlist/${item._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlist((prev) => prev.filter((w) => w._id !== item._id));
      toast.success("Removed from wishlist 💔");
    } catch (err) {
      console.error("❌ Failed to remove from wishlist:", err.response?.data || err.message);
      toast.error("Could not remove from wishlist");
    }
  };

  const isInWishlist = (placeId) => wishlist.some((item) => item.placeId === placeId);

  useEffect(() => {
    if (!loading && token) {
      fetchWishlist();
    }
  }, [loading, token]);

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
