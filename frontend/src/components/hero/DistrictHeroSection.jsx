import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const DistrictHeroSection = () => {
  const { districtName } = useParams();
  const [hero, setHero] = useState(null);

  useEffect(() => {
    const fetchDistrictHero = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/districts/${districtName}`);
        setHero(res.data.hero);
      } catch (error) {
        console.error("Error fetching district hero:", error.message);
      }
    };

    fetchDistrictHero();
  }, [districtName]);

  if (!hero) return <div className="h-[80vh] flex items-center justify-center">Loading...</div>;

  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hero.image})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-bold text-accent font-fredoka drop-shadow-xl mt-7"
        >
          {hero.name}
        </motion.h1>

        {hero.description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-3 text-lg md:text-1xl text-gray-200 font-overpass max-w-2xl drop-shadow-md"
          >
            {hero.description}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default DistrictHeroSection;
