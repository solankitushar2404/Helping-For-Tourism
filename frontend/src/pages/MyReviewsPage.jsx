import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { Star, Trash2, Pencil } from "lucide-react";
import ReviewModal from "../components/district/ReviewModal";
import clsx from "clsx";

const MyReviewsPage = () => {
  const { token } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const [activeType, setActiveType] = useState("Place");

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/reviews", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(data);
    } catch {
      toast.error("Failed to load reviews");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/reviews/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews((prev) => prev.filter((r) => r._id !== id));
      toast.success("Review deleted");
    } catch {
      toast.error("Failed to delete review");
    }
  };

  useEffect(() => {
    if (token) fetchReviews();
  }, [token]);

  const getTargetName = (review) => {
    return (
      review.place?.name ||
      review.hotel?.name ||
      review.event?.name ||
      "Unknown"
    );
  };

  const getTargetType = (review) => {
    if (review.place) return "Place";
    if (review.hotel) return "Hotel";
    if (review.event) return "Event";
    return "Unknown";
  };

  const filteredReviews = reviews.filter((r) => getTargetType(r) === activeType);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-indigo-950 mb-6 mr-2 text-center">📝 My Reviews</h1>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        {["Place", "Hotel", "Event"].map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={clsx(
              "px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200",
              activeType === type
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-indigo-600 border-indigo-300 hover:bg-indigo-50"
            )}
          >
            {type}
          </button>
        ))}
      </div>

      {filteredReviews.length === 0 ? (
        <p className="text-gray-600 text-center">
          You haven't posted any {activeType.toLowerCase()} reviews yet.
        </p>
      ) : (
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow rounded-xl p-5 border-l-4 border-indigo-500"
            >
              <h2 className="text-lg font-semibold text-indigo-600">
                {getTargetName(review)}{" "}
                <span className="text-sm text-gray-500 ml-2">
                  ({getTargetType(review)})
                </span>
              </h2>

              <div className="flex items-center text-yellow-500 mt-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 mt-2">{review.comment}</p>

              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => setEditingReview(review)}
                  className="text-sm text-blue-600 flex items-center gap-1 hover:underline"
                >
                  <Pencil className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="text-sm text-red-500 flex items-center gap-1 hover:underline"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingReview && (
        <ReviewModal
          existingReview={editingReview}
          targetType={getTargetType(editingReview)}
          targetId={
            editingReview.place?._id ||
            editingReview.hotel?._id ||
            editingReview.event?._id
          }
          onClose={() => setEditingReview(null)}
          onReviewSaved={fetchReviews}
        />
      )}
    </div>
  );
};

export default MyReviewsPage;
