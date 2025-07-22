import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Star, Pencil } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import ReviewModal from "./ReviewModal";

const DestinationCard = ({ id, name, image, description, isActive, stopSlider }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();
  const [showReviewModal, setShowReviewModal] = useState(false);

  const toggleWishlist = () => {
    if (!user) {
      toast.error("Please login first to use the wishlist.");
      return;
    }

    if (isInWishlist(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ userId: user._id, placeId: id, name, imageUrl: image, description });
    }
  };

  return (
    <>
      <div
        className={`relative group bg-white/30 backdrop-blur-lg border border-white/20 rounded-3xl shadow-xl p-6 flex flex-col items-center justify-between transition-transform duration-500 overflow-hidden cursor-pointer ${
          isActive ? "scale-105 ring-4 ring-indigo-400" : "scale-95 opacity-80"
        }`}
      >
        <div className="w-full h-56 md:h-64 overflow-hidden rounded-2xl relative">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-2xl"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist();
            }}
            className="absolute top-2 right-2 text-red-500 bg-white rounded-full p-2 z-20 shadow-md hover:scale-110 transition"
            title={isInWishlist(id) ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isInWishlist(id) ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
          </button>
        </div>

        <h3 className="text-2xl font-semibold mt-6 mb-3 text-center text-indigo-900 font-fredoka z-20">
          {name}
        </h3>
        <p className="text-center text-sm text-gray-700 font-overpass px-2 z-20">
          {description.length > 200 ? description.slice(0, 200) + "..." : description}
        </p>

        <button
          onClick={() => {
            if (!user) {
              toast.error("Please login to write a review.");
              return;
            }
            setShowReviewModal(true);
          }}
          className="mt-3 text-sm px-3 py-1.5 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all flex items-center gap-1 font-fredoka"
        >
          <Pencil size={14} /> Write a Review
        </button>
      </div>

      {showReviewModal && (
        <ReviewModal
          targetType="Place"          // ✅ Explicitly tell ReviewModal this is for a Place
          targetId={id}               // ✅ The ID of the Place
          onClose={() => setShowReviewModal(false)}
          stopSlider={stopSlider}
        />
      )}
    </>
  );
};

export default DestinationCard;
