// src/pages/WishlistPage.jsx

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { HeartCrack } from "lucide-react";

const WishlistPage = () => {
  const { user, token } = useContext(AuthContext); // ✅ include token from context
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlist(data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("Failed to load wishlist.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (placeId) => {
    try {
      await axios.delete(`http://localhost:5000/api/wishlist/${placeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlist((prev) => prev.filter((item) => item._id !== placeId));
      toast.success("Removed from wishlist 💔");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Could not remove item.");
    }
  };

  useEffect(() => {
    if (token) {
      fetchWishlist();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="text-lg font-semibold">Loading wishlist...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8 flex items-center justify-center gap-2">
        ✨ My Wishlist
      </h2>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center text-gray-500 mt-20">
          <HeartCrack size={48} className="text-red-400 mb-3" />
          <p className="text-lg">No places added yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((place) => (
            <motion.div
              key={place._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
            >
              <img
                src={place.imageUrl || "/default-placeholder.jpg"}
                alt={place.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{place.name}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-3">{place.description}</p>
                <button
                  onClick={() => handleRemove(place._id)}
                  className="mt-4 w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
