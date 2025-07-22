import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GoogleMap, useJsApiLoader, Marker, Polyline } from "@react-google-maps/api";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

// If you're using an auth context to get token
import { useAuth } from "../../context/AuthContext";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const centerDefault = {
  lat: 15.9129,
  lng: 79.74,
};

const PlanYourTrip = () => {
  const { districtName } = useParams();
  const [places, setPlaces] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [optimizedPlaces, setOptimizedPlaces] = useState([]);
  const [districtId, setDistrictId] = useState(null);
  const [showCongrats, setShowCongrats] = useState(false);
  const [totalDistance, setTotalDistance] = useState(0);

  const { token } = useAuth();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    const fetchDistrict = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/districts/${districtName}`);
        setDistrictId(data._id);
      } catch (error) {
        console.error("Error fetching district:", error);
      }
    };
    if (districtName) fetchDistrict();
  }, [districtName]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        if (districtId) {
          const { data } = await axios.get(`http://localhost:5000/api/places?district=${districtId}`);
          setPlaces(data);
        }
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };
    fetchPlaces();
  }, [districtId]);

  const handleCheckboxChange = (place) => {
    if (selectedPlaces.includes(place)) {
      setSelectedPlaces(selectedPlaces.filter((p) => p !== place));
    } else {
      setSelectedPlaces([...selectedPlaces, place]);
    }
  };

  const clearTrip = () => {
    setSelectedPlaces([]);
    setOptimizedPlaces([]);
    setTotalDistance(0);
    setShowCongrats(false);
  };

  const optimizeTrip = () => {
    if (selectedPlaces.length < 2) return;

    const sorted = [...selectedPlaces];
    const start = sorted[0];

    const ordered = [start];
    sorted.splice(0, 1);

    while (sorted.length > 0) {
      const last = ordered[ordered.length - 1];
      const nearestIndex = sorted.reduce((nearestIdx, place, idx) => {
        const distLast = Math.hypot(last.latitude - place.latitude, last.longitude - place.longitude);
        const distNearest = Math.hypot(last.latitude - sorted[nearestIdx].latitude, last.longitude - sorted[nearestIdx].longitude);
        return distLast < distNearest ? idx : nearestIdx;
      }, 0);

      ordered.push(sorted[nearestIndex]);
      sorted.splice(nearestIndex, 1);
    }

    setOptimizedPlaces(ordered);
    calculateDistance(ordered);
    setShowCongrats(true);
    setTimeout(() => setShowCongrats(false), 3000);
  };

  const calculateDistance = (places) => {
    let dist = 0;
    for (let i = 0; i < places.length - 1; i++) {
      const dx = places[i + 1].latitude - places[i].latitude;
      const dy = places[i + 1].longitude - places[i].longitude;
      dist += Math.sqrt(dx * dx + dy * dy) * 111; // 1 degree ≈ 111 km
    }
    setTotalDistance(dist.toFixed(2));
  };

  const saveTrip = async () => {
    if (optimizedPlaces.length < 2) return;

    try {
      const placeIds = optimizedPlaces.map((p) => p._id);
      await axios.post(
        "http://localhost:5000/api/trips",
        { places: placeIds, distance: totalDistance },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Trip saved successfully!");
    } catch (err) {
      console.error("Error saving trip", err);
      toast.error("Failed to save trip");
    }
  };

  const path = optimizedPlaces.length > 0 ? optimizedPlaces : selectedPlaces;

  return (
    <section className="py-14 px-6 bg-gradient-to-b from-emerald-50 to-gray-100 min-h-screen" id="plan">
      <AnimatePresence>
        {showCongrats && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-green-400 text-white px-8 py-4 rounded-2xl shadow-lg font-bold text-2xl z-50"
          >
            🎉 Trip Optimized Successfully!
          </motion.div>
        )}
      </AnimatePresence>

      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-10 text-heading font-fredoka"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Plan Your Trip 🧭
      </motion.h2>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={optimizeTrip}
          className="px-6 py-2 bg-primary text-white rounded-full shadow hover:bg-indigo-700 transition"
        >
          Optimize Trip ✨
        </button>
        <button
          onClick={clearTrip}
          className="px-6 py-2 bg-red-500 text-white rounded-full shadow hover:bg-red-700 transition"
        >
          Clear Trip 🗑️
        </button>
        <button
          onClick={saveTrip}
          className="px-6 py-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition"
        >
          Save Trip 💾
        </button>
      </div>

      {/* Select Places */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto mb-10">
        {places.map((place) => (
          <label
            key={place._id}
            className="flex items-center gap-4 bg-white rounded-2xl shadow-md p-4 hover:shadow-xl cursor-pointer transition"
          >
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-primary"
              checked={selectedPlaces.includes(place)}
              onChange={() => handleCheckboxChange(place)}
            />
            <span className="text-heading font-overpass font-medium">{place.name}</span>
          </label>
        ))}
      </div>

      {/* Map */}
      {isLoaded && (
        <div className="w-full max-w-7xl mx-auto mb-12">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={path.length > 0 ? { lat: path[0].latitude, lng: path[0].longitude } : centerDefault}
            zoom={10}
          >
            {path.map((place, idx) => (
              <Marker
                key={idx}
                position={{ lat: place.latitude, lng: place.longitude }}
                label={`${idx + 1}`}
              />
            ))}

            {path.length >= 2 && (
              <Polyline
                path={path.map((place) => ({
                  lat: place.latitude,
                  lng: place.longitude,
                }))}
                options={{
                  strokeColor: "#4f46e5",
                  strokeOpacity: 1,
                  strokeWeight: 5,
                  icons: [
                    {
                      icon: {
                        path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                        strokeOpacity: 1,
                        scale: 3,
                      },
                      offset: "0",
                      repeat: "100px",
                    },
                  ],
                }}
              />
            )}
          </GoogleMap>
        </div>
      )}

      {/* Optimized Trip Table */}
      {path.length > 0 && (
        <motion.div
          className="max-w-4xl mx-auto bg-white/50 backdrop-blur-md p-8 rounded-2xl shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-center mb-6 text-primary">Your Trip Plan 🗺️</h3>
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="text-lg text-heading">
                <th className="pb-4">Step</th>
                <th className="pb-4">Place Name</th>
              </tr>
            </thead>
            <tbody>
              {path.map((place, idx) => (
                <motion.tr
                  key={idx}
                  whileHover={{ scale: 1.02, backgroundColor: "#e0e7ff" }}
                  className="transition rounded-2xl"
                >
                  <td className="py-3 font-semibold text-indigo-700">{idx + 1}</td>
                  <td className="py-3 font-overpass text-gray-800">{place.name}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {/* Total Distance */}
          <div className="text-center mt-6 font-semibold text-lg text-heading">
            🚗 Estimated Trip Distance: <span className="text-indigo-600">{totalDistance} km</span>
          </div>

          {/* Route Summary */}
          <div className="text-center mt-4 text-subtext font-overpass">
            <span className="font-semibold text-primary">Route:</span>{" "}
            {path.map((place, idx) => (
              <span key={idx}>
                {place.name} {idx !== path.length - 1 && "➡️ "}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default PlanYourTrip;
