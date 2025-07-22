import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import EmojiPicker from "emoji-picker-react";
import { motion } from "framer-motion";

const ReviewModal = ({
  targetType = "Place",
  targetId,
  onClose,
  stopSlider,
  existingReview = null,
  onReviewSaved,
}) => {
  const [rating, setRating] = useState(existingReview?.rating || 5);
  const [comment, setComment] = useState(existingReview?.comment || "");
  const [showPicker, setShowPicker] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    if (stopSlider) stopSlider(true);
    const handleEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
      if (stopSlider) stopSlider(false);
    };
  }, [onClose, stopSlider]);

  const handleEmojiClick = (emojiData) => {
    setComment((prev) => prev + emojiData.emoji);
  };

  const handleSubmit = async () => {
    if (!comment.trim()) return toast.error("Comment cannot be empty.");
    try {
      if (existingReview && existingReview._id) {
        await axios.put(
          `http://localhost:5000/api/reviews/${existingReview._id}`,
          { comment, rating },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Review updated!");
      } else {
        await axios.post(
          `http://localhost:5000/api/reviews`,
          { targetType, targetId, rating, comment },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Review submitted!");
      }
      onReviewSaved?.();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/20 rounded-2xl flex items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl relative"
      >
        <h2 className="text-2xl font-bold text-indigo-600 mb-4 text-center">
          {existingReview ? "Edit Your Review" : "Write a Review"}
        </h2>

        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-700">Rating</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} Star{r > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 relative">
          <label className="block text-sm mb-1 text-gray-700">Comment</label>
          <textarea
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 resize-none focus:ring-indigo-500 focus:border-indigo-500"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              if (stopSlider) stopSlider(true);
            }}
            placeholder="Share your experience..."
          />
          <button
            type="button"
            onClick={() => setShowPicker((prev) => !prev)}
            className="absolute bottom-2 right-2 text-xl"
          >
            😊
          </button>
          {showPicker && (
            <div className="absolute z-50 bottom-16 right-0">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            {existingReview ? "Update" : "Submit"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ReviewModal;
