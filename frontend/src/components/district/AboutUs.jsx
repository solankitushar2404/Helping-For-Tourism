import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";

const teamMembers = [
      {
        name: "Meet Vaghasiya",
        role: "Project Lead & Full Stack Developer",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSeqpB-UHUJ1CDP24e8q8WxT_ahhPHDFSY2Zu1m_9Y42CCrIsMH9OiuaLK42SOhBUj3Mo&usqp=CAU",
        description:
          "Meet developed the entire Helping for Tourism platform using the MERN stack...",
      },
      {
        name: "Tushar Solanki",
        role: "Frontend Developer",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSeqpB-UHUJ1CDP24e8q8WxT_ahhPHDFSY2Zu1m_9Y42CCrIsMH9OiuaLK42SOhBUj3Mo&usqp=CAU",
        description:
          "Tushar worked on responsive React components and optimized UI...",
      },
      {
        name: "Vishal Punani",
        role: "Data Manager",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSeqpB-UHUJ1CDP24e8q8WxT_ahhPHDFSY2Zu1m_9Y42CCrIsMH9OiuaLK42SOhBUj3Mo&usqp=CAU",
        description:
          "Vishal managed tourism data, including destinations, hotels, and events...",
      },
      {
        name: "Rajan",
        role: "UI/UX Designer",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSeqpB-UHUJ1CDP24e8q8WxT_ahhPHDFSY2Zu1m_9Y42CCrIsMH9OiuaLK42SOhBUj3Mo&usqp=CAU",
        description:
          "Rajan designed the layout, color scheme, and visual aesthetics...",
      },
];

const AboutUs = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-gradient-to-b from-orange-50 to-white text-heading" id="about">
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center">

        {/* Heading */}
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-6 font-fredoka"
          initial={{ opacity: 0, y: -30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
        >
          About Helping for Tourism 🌏
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-lg md:text-xl font-overpass text-subtext mb-12 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Helping for Tourism is your digital guide to explore the beautiful diversity of India.
          Discover famous places, cultural events, hidden gems, and plan unforgettable journeys — all at your fingertips.
        </motion.p>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-10 mb-20 w-full">
          <motion.div
            className="p-8 rounded-2xl shadow-xl bg-white hover:shadow-2xl transition-all border-l-4 border-primary"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold font-fredoka mb-4">Our Mission</h3>
            <p className="text-base font-overpass text-subtext">
              To make travel in India easier, inspiring, and full of life. We want everyone to explore India's beauty,
              learn its stories, and experience the spirit of every region.
            </p>
          </motion.div>

          <motion.div
            className="p-8 rounded-2xl shadow-xl bg-white hover:shadow-2xl transition-all border-l-4 border-secondary"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-2xl font-semibold font-fredoka mb-4">Our Vision</h3>
            <p className="text-base font-overpass text-subtext">
              To build India's most trusted tourism platform, where every traveler finds
              the perfect destination, event, and inspiration for their next journey.
            </p>
          </motion.div>
        </div>

        {/* Team Carousel */}
        <motion.h2
          className="text-3xl font-bold mb-8 font-fredoka"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Meet Our Team 👥
        </motion.h2>

        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full max-w-6xl"
        >
          {teamMembers.map((member, idx) => (
            <SwiperSlide key={idx} className="flex justify-center">
              <motion.div
                className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center hover:shadow-2xl transition-all"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-28 h-28 rounded-full object-cover mb-4 shadow-md"
                />
                <h4 className="text-xl font-semibold font-fredoka">{member.name}</h4>
                <p className="text-sm text-subtext font-overpass">{member.role}</p>
                <p className="text-sm text-subtext font-overpass pt-1">{member.description}</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Scroll down animated hint */}
        <motion.div
          className="absolute bottom-10 text-primary animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          ↓
        </motion.div>

      </div>
    </section>
  );
};

export default AboutUs;
