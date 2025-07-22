import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { Trash2, MapPin, Landmark } from "lucide-react";

// List of unique light Tailwind background colors
const lightColors = [
  "bg-red-50",
  "bg-green-50",
  "bg-yellow-50",
  "bg-blue-50",
  "bg-purple-50",
  "bg-pink-50",
  "bg-orange-50",
  "bg-cyan-50",
  "bg-lime-50",
  "bg-teal-50",
  "bg-rose-50",
  "bg-indigo-50",
  "bg-emerald-50",
  "bg-sky-50",
];

const MyTripsPage = () => {
  const { token } = useAuth();
  const [trips, setTrips] = useState([]);
  const [districtColorMap, setDistrictColorMap] = useState({});

  // Assign random unused color to a district
  const assignColorToDistrict = (districtName) => {
    if (!districtColorMap[districtName]) {
      const usedColors = Object.values(districtColorMap);
      const availableColors = lightColors.filter((c) => !usedColors.includes(c));
      const randomColor = availableColors.length > 0
        ? availableColors[Math.floor(Math.random() * availableColors.length)]
        : "bg-gray-100"; // fallback
      setDistrictColorMap((prev) => ({ ...prev, [districtName]: randomColor }));
      return randomColor;
    }
    return districtColorMap[districtName];
  };

  const fetchTrips = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/trips", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrips(data);

      // Build district-color map
      const newMap = {};
      const seen = new Set();
      for (const trip of data) {
        for (const place of trip.places) {
          const district = place.district?.name;
          if (district && !seen.has(district)) {
            seen.add(district);
            const used = Object.values(newMap);
            const available = lightColors.filter((c) => !used.includes(c));
            newMap[district] = available.length > 0
              ? available[Math.floor(Math.random() * available.length)]
              : "bg-gray-100";
          }
        }
      }
      setDistrictColorMap(newMap);
    } catch (err) {
      console.error(err);
      toast.error("Could not load trips");
    }
  };

  const handleDelete = async (tripId) => {
    try {
      await axios.delete(`http://localhost:5000/api/trips/${tripId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrips((prev) => prev.filter((t) => t._id !== tripId));
      toast.success("Trip deleted");
    } catch (err) {
      toast.error("Failed to delete trip");
    }
  };

  useEffect(() => {
    if (token) fetchTrips();
  }, [token]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10">🧳 My Saved Trips</h1>

      {trips.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <img
            src="https://www.svgrepo.com/show/331428/empty-box.svg"
            alt="No trips"
            className="mx-auto w-32 h-32 mb-4 opacity-60"
          />
          <p className="text-lg">You haven't saved any trips yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip) => {
            const districtNames = [...new Set(trip.places.map((p) => p.district?.name).filter(Boolean))];
            const firstDistrict = districtNames[0] || "Unknown";
            const bgColor = districtColorMap[firstDistrict] || assignColorToDistrict(firstDistrict);

            return (
              <div
                key={trip._id}
                className={`${bgColor} shadow-md rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition duration-300`}
              >
                <div>
                  {/* 🏞️ District Heading */}
                  <div className="flex items-center gap-2 mb-2">
                    <Landmark className="w-5 h-5 text-pink-600" />
                    <h3 className="text-md font-bold text-pink-600">
                      {districtNames.length > 1
                        ? districtNames.join(", ")
                        : firstDistrict}
                    </h3>
                  </div>

                  {/* 📍 Place Count */}
                  <h2 className="text-md font-semibold text-indigo-600 mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-indigo-500" />
                    {trip.places.length} Place{trip.places.length > 1 ? "s" : ""}
                  </h2>

                  {/* 📝 Place List */}
                  <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                    {trip.places.map((p) => (
                      <li key={p._id} className="truncate">{p.name}</li>
                    ))}
                  </ul>

                  {/* 🚗 Distance */}
                  <p className="text-sm text-gray-600 font-medium">
                    Total Distance: <span className="text-indigo-500">{trip.distance} km</span>
                  </p>
                </div>

                {/* 🗑️ Delete Button */}
                <button
                  onClick={() => handleDelete(trip._id)}
                  className="mt-6 flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  <Trash2 className="w-4 h-4" /> Delete Trip
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyTripsPage;