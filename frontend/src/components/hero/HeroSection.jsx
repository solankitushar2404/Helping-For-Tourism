import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroSection = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchHeroSlides = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/districts");
        setSlides(res.data);
      } catch (error) {
        console.error("Error fetching hero slides:", error);
      }
    };

    fetchHeroSlides();
  }, []);

  if (slides.length === 0) return null;

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        effect="fade"
        navigation={true}
        pagination={{ clickable: true, dynamicBullets: true }}
        className="w-full h-full"
      >
        {slides.map((district, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-full bg-cover bg-center scale-100 hover:scale-105 transition-transform duration-1000 ease-in-out"
              style={{ backgroundImage: `url(${district.hero.image})` }}
            >
              <div className="absolute inset-0 bg-black/50 z-10" />

              <div className="relative z-20 flex flex-col justify-center items-center h-full px-4 text-white">
                <motion.h1
                  className="text-4xl md:text-5xl mt-11 font-fredoka font-bold text-accent drop-shadow-xl"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  {district.hero.name}
                </motion.h1>
                <motion.p
                  className="mt-2 text-lg md:text-2xl font-overpass max-w-2xl text-center text-gray-200 drop-shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                >
                  {district.hero.description}
                </motion.p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .swiper-button-prev,
        .swiper-button-next {
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 9999px;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 10px rgba(255, 255, 255, 0.2);
          top: 57% !important;
          transform: translateY(-50%) !important;
        }

        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        .swiper-button-prev::after,
        .swiper-button-next::after {
          font-size: 16px;
          font-weight: bold;
        }

        .swiper-pagination-bullet {
          background: #f59e78; /* secondary color */
          opacity: 0.6;
          width: 8px;
          height: 8px;
          margin: 0 4px !important;
        }

        .swiper-pagination-bullet-active {
          background: #f59e0b; /* accent color */
          width: 10px;
          height: 10px;
          border: 2px solid white;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;