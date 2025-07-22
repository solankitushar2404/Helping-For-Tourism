import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import DestinationCard from './DestinationCard';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const DestinationsSection = () => {
  const { districtName } = useParams();
  const [places, setPlaces] = useState([]);
  const [districtId, setDistrictId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const fetchDistrict = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/districts/${districtName}`);
        setDistrictId(data._id);
      } catch (error) {
        console.error('Error fetching district:', error);
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
        console.error('Error fetching places:', error);
      }
    };

    fetchPlaces();
  }, [districtId]);

  const handleStopSlider = (pause) => {
    if (!swiperInstance) return;
    pause ? swiperInstance.autoplay.stop() : swiperInstance.autoplay.start();
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-[#e0f7fa] to-white" id="destinations">
      {/* Animated Heading */}
      <div className="relative z-10 text-center mb-16">
        <motion.h2
          className="text-4xl md:text-5xl font-bold font-fredoka text-heading mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Explore Top Destinations 🗺️
        </motion.h2>
        <motion.p
          className="text-lg font-overpass text-subtext max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Discover must-visit places that define each district’s unique charm.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {places.length > 0 ? (
          <div className="relative">
            {/* Custom Arrows */}
            <div
              ref={prevRef}
              className="swiper-button-prev-custom absolute left-0 top-1/2 transform -translate-y-1/2 z-20 text-3xl text-gray-600 hover:text-indigo-600 cursor-pointer select-none px-4"
            >
              ‹
            </div>
            <div
              ref={nextRef}
              className="swiper-button-next-custom absolute right-0 top-1/2 transform -translate-y-1/2 z-20 text-3xl text-gray-600 hover:text-indigo-600 cursor-pointer select-none px-4"
            >
              ›
            </div>

            {/* Swiper */}
            <Swiper
              modules={[Navigation, Autoplay]}
              loop
              centeredSlides
              grabCursor
              slidesPerView={3}
              spaceBetween={50}
              onSwiper={(swiper) => setSwiperInstance(swiper)}
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
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              breakpoints={{
                320: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1280: { slidesPerView: 3 },
              }}
              className="w-full"
            >
              {places.map((place, idx) => (
                <SwiperSlide key={place._id} className="py-10">
                  <DestinationCard
                    id={place._id}
                    name={place.name}
                    image={place.image}
                    description={place.description}
                    isActive={idx === activeIndex}
                    stopSlider={handleStopSlider}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-8">No destinations found.</p>
        )}
      </div>
    </section>
  );
};

export default DestinationsSection;

