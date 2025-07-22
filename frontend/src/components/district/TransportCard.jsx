import { motion } from "framer-motion";

const TransportCard = ({ transport }) => {
  if (!transport) return null;

  const { mode, name, from, time, link } = transport;

  const modeIcons = {
    air: "✈️",
    train: "🚆",
    bus: "🚌",
  };

  const modeColors = {
    air: "from-blue-100 via-blue-50 to-white",
    train: "from-green-100 via-green-50 to-white",
    bus: "from-yellow-100 via-yellow-50 to-white",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`bg-gradient-to-b ${modeColors[mode]} p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 group cursor-pointer flex flex-col justify-between`}
    >
      <div className="flex items-center justify-center text-4xl mb-4">
        {modeIcons[mode]}
      </div>

      <h3 className="text-xl font-bold text-center mb-2 font-fredoka text-heading group-hover:text-primary transition">
        {name}
      </h3>

      <p className="text-center text-sm font-overpass text-subtext mb-4">
        {from} — {time}
      </p>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-block text-center bg-primary text-white font-medium px-6 py-2 rounded-full hover:bg-indigo-700 transition"
      >
        Book Now
      </a>
    </motion.div>
  );
};

export default TransportCard;
