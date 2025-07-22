import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, Pencil } from "lucide-react";
import ReviewModal from "../district/ReviewModal";

const HotelCard = ({ hotel, isActive, onReviewModalToggle }) => {
  const [showReviewModal, setShowReviewModal] = useState(false);

  const handleModalOpen = () => {
    setShowReviewModal(true);
    onReviewModalToggle?.(true);
  };

  const handleModalClose = () => {
    setShowReviewModal(false);
    onReviewModalToggle?.(false);
  };

  if (!hotel) return null;

  const averageRating = typeof hotel.rating === "number" ? hotel.rating : 0;
  const reviewCount = Array.isArray(hotel.reviews) ? hotel.reviews.length : 0;
  const imageUrl = hotel.image || "https://via.placeholder.com/400x250?text=No+Image";

  return (
    <>
      <motion.div
        className={`relative group bg-white rounded-2xl shadow-xl p-5 flex flex-col items-center justify-between transition-all duration-300 overflow-hidden cursor-pointer ${
          isActive ? "scale-100 ring-4 ring-primary" : "opacity-90"
        }`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {hotel.category && (
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-primary text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
              {hotel.category}
            </div>
          </div>
        )}

        <div className="w-full h-56 overflow-hidden rounded-xl">
          <img
            src={imageUrl}
            alt={hotel.name || "Hotel"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="text-center mt-4">
          <h3 className="text-xl font-bold mb-1 text-heading font-fredoka">{hotel.name}</h3>
          <p className="text-sm text-subtext mb-2">{hotel.address}</p>

          <div className="flex justify-center items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.round(averageRating) ? "text-yellow-400" : "text-gray-300"}
                fill={i < Math.round(averageRating) ? "#facc15" : "none"}
              />
            ))}
            <span className="text-xs text-gray-500 ml-2">
              {reviewCount} review{reviewCount !== 1 && "s"}
            </span>
          </div>

          <p className="text-lg font-semibold text-primary font-overpass">
            ₹{hotel.price_per_night || "—"} / night
          </p>

          <div className="flex justify-center mt-3">
            <button
              onClick={handleModalOpen}
              className="text-sm px-3 py-1.5 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all flex items-center gap-1 font-fredoka"
            >
              <Pencil size={14} /> Write a Review
            </button>
          </div>
        </div>
      </motion.div>

      {showReviewModal && (
        <ReviewModal
          targetType="Hotel"
          targetId={hotel._id}
          onClose={handleModalClose}
          stopSlider={onReviewModalToggle}
        />
      )}
    </>
  );
};

export default HotelCard;
