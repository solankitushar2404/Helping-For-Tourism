import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import { Star, Pencil } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReviewModal from "../district/ReviewModal"; // Update path as needed
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const LocationForm = () => {
  const navigate = useNavigate();
  const [districtData, setDistrictData] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [eventStatus, setEventStatus] = useState(null);
  const [daysDiff, setDaysDiff] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/districts");
        setDistrictData(res.data);
        const uniqueStates = [...new Set(res.data.map((item) => item.state))];
        const formattedStates = uniqueStates.map((state) => ({
          value: state,
          label: state,
        }));
        setStates(formattedStates);
      } catch (error) {
        console.error("Error fetching districts:", error.message);
      }
    };
    fetchDistricts();
  }, []);

  useEffect(() => {
    if (selectedState) {
      const filteredDistricts = districtData
        .filter((item) => item.state === selectedState.value)
        .map((item) => ({ value: item.name, label: item.name }));
      setDistricts(filteredDistricts);
    } else {
      setDistricts([]);
    }
  }, [selectedState, districtData]);

  const calculateEventTiming = (startDate, endDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (today < start) {
      const daysLeft = Math.ceil((start - today) / (1000 * 60 * 60 * 24));
      setEventStatus("Upcoming");
      setDaysDiff(daysLeft);
    } else if (today >= start && today <= end) {
      setEventStatus("Ongoing");
      setDaysDiff(null);
    } else {
      const daysAgo = Math.ceil((today - end) / (1000 * 60 * 60 * 24));
      setEventStatus("Ended");
      setDaysDiff(daysAgo);
    }
  };

  const formatEventDate = (dateString) => {
    const today = new Date();
    const original = new Date(dateString);
    const updatedDate = new Date(today.getFullYear(), original.getMonth(), original.getDate());
    return updatedDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // ✅ Check if user is logged in (e.g., via token)
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to start your journey");
      navigate("/login");
      return;
    }    
  
    if (!selectedDistrict) return;
  
    try {
      const districtRes = await axios.get(`http://localhost:5000/api/districts/${selectedDistrict.value}`);
      const district = districtRes.data;
      const eventsRes = await axios.get(`http://localhost:5000/api/events?district=${district._id}`);
      const events = eventsRes.data;
  
      if (events.length > 0) {
        const event = events[0];
        setEventData(event);
        calculateEventTiming(event.start_date, event.end_date);
        setShowEventModal(true);
      } else {
        navigate(`/district/${selectedDistrict.value}`);
      }
    } catch (error) {
      console.error("Error fetching event or district:", error.message);
      navigate(`/district/${selectedDistrict.value}`);
    }
  };
  

  const closeModalAndRedirect = () => {
    setShowEventModal(false);
    navigate(`/district/${selectedDistrict.value}`);
  };

  return (
    <section className="bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-fredoka text-heading font-bold mb-3">
          🎉 Welcome to <span className="text-accent">HelpingforTourism</span> 🎉
        </h2>
        <p className="text-subtext font-overpass mb-6">
          Select your State and District to start your journey!
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center border border-gray-300 bg-white rounded-2xl p-8 shadow-2xl">
          <Select options={states} value={selectedState} onChange={setSelectedState} placeholder="Select State" className="w-full" />
          <Select options={districts} value={selectedDistrict} onChange={setSelectedDistrict} placeholder="Select District" className="w-full" isDisabled={!selectedState} />
          <button type="submit" className="px-8 py-3 bg-primary text-white rounded-xl hover:bg-indigo-700 transition font-fredoka w-full">
            Start Journey
          </button>
        </form>

        <AnimatePresence>
          {showEventModal && eventData && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 text-center">
                <h3 className="text-2xl font-bold text-accent mb-3">🎉 Special Event 🎉</h3>
                <img src={eventData.image} alt={eventData.name} className="rounded-xl mb-4 w-full h-48 object-cover" />
                <p className="text-xl font-fredoka font-semibold text-heading mb-1">{eventData.name}</p>
                <p className="text-subtext mb-2">📍 {eventData.location}</p>
                <p className="text-sm text-gray-600">📅 From: {formatEventDate(eventData.start_date)}</p>
                <p className="text-sm text-gray-600 mb-2">📅 To: {formatEventDate(eventData.end_date)}</p>
                {eventStatus === "Upcoming" && (
                  <p className="text-blue-400 font-overpass font-medium mb-2">Coming Soon — starts in {daysDiff} day(s)</p>
                )}
                {eventStatus === "Ongoing" && (
                  <p className="text-green-600 font-medium mb-2">🎊 This event is happening now!</p>
                )}
                {eventStatus === "Ended" && (
                  <p className="text-red-600 font-medium mb-2">Event ended {daysDiff} day(s) ago</p>
                )}

                  <div className="flex justify-center mt-3">
                    <button
                      onClick={() => setShowReviewModal(true)}
                      className="text-sm px-3 py-1.5 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all flex items-center gap-1 font-fredoka"
                    >
                      <Pencil size={14} /> Write a Review
                    </button>
                  </div>
                <div className="flex flex-col gap-3 mt-4">
                  <button onClick={closeModalAndRedirect} className="px-6 py-2 bg-primary text-white rounded-xl hover:bg-indigo-700 transition">
                    Continue to District
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {showReviewModal && eventData && (
          <ReviewModal
            targetType="Event"
            targetId={eventData._id}
            onClose={() => setShowReviewModal(false)}
            stopSlider={null}
          />
        )}
      </div>
    </section>
  );
};

export default LocationForm;
