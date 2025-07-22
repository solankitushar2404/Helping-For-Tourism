import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TransportCard from "./TransportCard";
import { motion } from "framer-motion";

const TransportSection = () => {
  const { districtName } = useParams();
  const [districtId, setDistrictId] = useState(null);
  const [transports, setTransports] = useState([]);
  const [selectedMode, setSelectedMode] = useState("air");

  useEffect(() => {
    const fetchDistrictId = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/districts/${districtName}`);
        setDistrictId(data._id);
      } catch (error) {
        console.error("Error fetching district:", error);
      }
    };

    if (districtName) fetchDistrictId();
  }, [districtName]);

  useEffect(() => {
    const fetchTransportData = async () => {
      try {
        if (districtId) {
          const { data } = await axios.get(`http://localhost:5000/api/transport/${districtId}`);
          setTransports(data || []);
        }
      } catch (error) {
        console.error("Error fetching transport info:", error);
      }
    };

    fetchTransportData();
  }, [districtId]);

  const filteredTransports = transports.filter((item) => item.mode === selectedMode);

  return (
    <section className="relative py-16 px-4 md:px-8 bg-gradient-to-b from-[#e0f7fa] to-white"  id="transport">
      {/* Heading */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-10 font-fredoka text-heading"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        How to Reach
      </motion.h2>

      {/* Mode Selector */}
      <div className="flex justify-center gap-4 mb-8">
        {["air", "train", "bus"].map((mode) => (
          <button
            key={mode}
            onClick={() => setSelectedMode(mode)}
            className={`px-5 py-2 rounded-full font-fredoka text-sm md:text-base transition 
            ${selectedMode === mode ? "bg-primary text-white" : "bg-white text-primary border border-primary"} 
            hover:bg-primary hover:text-white`}
          >
            {mode === "air" && "✈️ Flight"}
            {mode === "train" && "🚆 Train"}
            {mode === "bus" && "🚌 Bus"}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {filteredTransports.length > 0 ? (
          filteredTransports.map((item) => (
            <TransportCard key={item._id} transport={item} />
          ))
        ) : (
          <p className="text-center text-subtext font-overpass col-span-full">
            No transport info available.
          </p>
        )}
      </div>
    </section>
  );
};

export default TransportSection;
