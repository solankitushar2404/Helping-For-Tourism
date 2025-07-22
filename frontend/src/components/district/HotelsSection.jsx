// Updated HotelsSection.js
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import HotelCard from "./HotelCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const HotelsSection = () => {
  const { districtName } = useParams();
  const [hotels, setHotels] = useState([]);
  const [districtId, setDistrictId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayPaused, setAutoplayPaused] = useState(false);

  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

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
    const fetchHotels = async () => {
      try {
        if (districtId) {
          const { data } = await axios.get(`http://localhost:5000/api/hotels?district=${districtId}`);
          setHotels(data);
        }
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };
    fetchHotels();
  }, [districtId]);

  const handleReviewModalToggle = (isOpen) => {
    setAutoplayPaused(isOpen);
    if (swiperRef.current) {
      if (isOpen) swiperRef.current.autoplay.stop();
      else swiperRef.current.autoplay.start();
    }
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-[#edf2f7] to-[#eff5fb]" id="hotels">
      <motion.div className="absolute top-0 left-0 w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.div
          className="absolute bg-primary/20 rounded-full w-80 h-80 top-[-10%] left-[-10%] blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, 30, 0] }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
        />
        <motion.div
          className="absolute bg-secondary/20 rounded-full w-80 h-80 top-1/3 right-[-10%] blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, -30, 0] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        />
      </motion.div>

      <div className="relative z-10 text-center mb-16">
        <motion.h2 className="text-4xl md:text-5xl font-bold font-fredoka text-heading mb-4"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          Find Your Perfect Stay 🏨
        </motion.h2>
        <motion.p className="text-lg font-overpass text-subtext max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
          Handpicked hotels for your memorable journeys across beautiful India.
        </motion.p>
      </div>

      {hotels.length > 0 ? (
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 z-10">
          <div ref={prevRef} className="swiper-button-prev-custom absolute left-0 top-1/2 transform -translate-y-1/2 z-20 text-3xl text-gray-600 hover:text-indigo-600 cursor-pointer select-none px-4">
            ‹
          </div>
          <div ref={nextRef} className="swiper-button-next-custom absolute right-0 top-1/2 transform -translate-y-1/2 z-20 text-3xl text-gray-600 hover:text-indigo-600 cursor-pointer select-none px-4">
            ›
          </div>

          <Swiper
            modules={[Navigation, Autoplay]}
            loop
            centeredSlides
            grabCursor
            slidesPerView={3}
            spaceBetween={50}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              if (typeof swiper.params.navigation !== "boolean") {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="w-full"
          >
            {hotels.map((hotel, idx) => (
              <SwiperSlide key={hotel._id} className="py-10">
                <HotelCard hotel={hotel} 
                  isActive={idx === activeIndex} 
                  onReviewModalToggle={handleReviewModalToggle} 
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <p className="text-center text-subtext mt-8 z-10">No hotels found.</p>
      )}
    </section>
  );
};

export default HotelsSection;

