import { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import clsx from "clsx";

const REVIEWS_PER_PAGE = 6;

const AllReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [activeType, setActiveType] = useState("Place");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No auth token found.");
          return;
        }

        const { data } = await axios.get("http://localhost:5000/api/reviews/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Sort reviews by createdAt descending
        const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setReviews(sorted);
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      }
    };
    fetchReviews();
  }, []);

  const filteredReviews = reviews.filter((review) => review.targetType === activeType);
  const totalPages = Math.ceil(filteredReviews.length / REVIEWS_PER_PAGE);
  const startIdx = (currentPage - 1) * REVIEWS_PER_PAGE;
  const paginatedReviews = filteredReviews.slice(startIdx, startIdx + REVIEWS_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleTypeChange = (type) => {
    setActiveType(type);
    setCurrentPage(1); // Reset to first page on type change
  };

  return (
    <section id="reviews" className="bg-gradient-to-b from-indigo-50 to-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-indigo-800 mb-6 font-fredoka">
          What Travelers Say
        </h2>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-10">
          {["Place", "Hotel", "Event"].map((type) => (
            <button
              key={type}
              onClick={() => handleTypeChange(type)}
              className={clsx(
                "px-4 py-2 rounded-full border transition-all duration-300 text-sm font-medium",
                activeType === type
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-indigo-600 border-indigo-300 hover:bg-indigo-50"
              )}
            >
              {type}
            </button>
          ))}
        </div>

        {paginatedReviews.length === 0 ? (
          <p className="text-center text-gray-500">
            No {activeType.toLowerCase()} reviews available yet.
          </p>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedReviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-indigo-600 mb-1">
                    {review.refData?.name || "Unnamed"}
                  </h3>

                  <div className="flex items-center mb-2 text-yellow-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                    ))}
                  </div>

                  <p className="text-gray-700 text-sm mb-4 italic">"{review.comment}"</p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <img
                        src={review.user?.avatar || "/default-avatar.png"}
                        alt="User"
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="font-medium">
                        {review.user?.username || "Anonymous"}
                      </span>
                    </div>
                    <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Buttons */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-10 gap-4">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className={clsx(
                    "px-4 py-2 rounded-full text-sm font-medium border transition",
                    currentPage === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white text-indigo-600 border-indigo-300 hover:bg-indigo-50"
                  )}
                >
                  Prev
                </button>
                <span className="text-sm text-gray-600 flex items-center">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={clsx(
                    "px-4 py-2 rounded-full text-sm font-medium border transition",
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white text-indigo-600 border-indigo-300 hover:bg-indigo-50"
                  )}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default AllReviewsSection;
