import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaChevronRight,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#16202C] text-white pt-16 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold font-fredoka mb-4 text-primary">Helping for Tourism</h2>
          <p className="text-subtext mb-4 font-overpass">
            Your one-stop platform to explore destinations, hotels, and travel options across India. 🌏✨
          </p>
        </div>

        {/* Quick Links 1 */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-primary">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/" className="flex items-center hover:text-primary transition-all">
                <FaChevronRight className="mr-2" /> Home
              </Link>
            </li>
            <li>
              <a href="#destinations" className="flex items-center hover:text-primary transition-all">
                <FaChevronRight className="mr-2" /> Destinations
              </a>
            </li>
            <li>
              <a href="#hotels" className="flex items-center hover:text-primary transition-all">
                <FaChevronRight className="mr-2" /> Hotels
              </a>
            </li>
            <li>
              <a href="#transport" className="flex items-center hover:text-primary transition-all">
                <FaChevronRight className="mr-2" /> Transport
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links 2 */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-primary">More Links</h3>
          <ul className="space-y-3">
            <li>
              <a href="#plan" className="flex items-center hover:text-primary transition-all">
                <FaChevronRight className="mr-2" /> Plan Your Trip
              </a>
            </li>
            <li>
              <a href="#about" className="flex items-center hover:text-primary transition-all">
                <FaChevronRight className="mr-2" /> About Us
              </a>
            </li>
            <li>
              <a href="#contact" className="flex items-center hover:text-primary transition-all">
                <FaChevronRight className="mr-2" /> Contact Us
              </a>
            </li>
            <li>
              <Link to="/login" className="flex items-center hover:text-primary transition-all">
                <FaChevronRight className="mr-2" /> Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-primary">Contact Info</h3>
          <p className="mb-2 text-subtext">Email: support@tourismindia.com</p>
          <p className="mb-2 text-subtext">Phone: +91 xxxxx xxxxx</p>
          <p className="mb-4 text-subtext">Address: Bhavnagar, Gujarat, India</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-primary"><FaFacebookF /></a>
            <a href="#" className="hover:text-primary"><FaInstagram /></a>
            <a href="#" className="hover:text-primary"><FaTwitter /></a>
            <a href="#" className="hover:text-primary"><FaGithub /></a>
          </div>
        </div>
      </div>

      {/* Small Divider Line */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/40 via-primary to-primary/40 animate-pulse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      {/* Bottom copyright */}
      <div className="text-center text-sm text-subtext mt-12">
        &copy; 2025 Helping for Tourism | Made with <span className="text-red-500">❤</span> by My Team
      </div>
    </footer>
  );
};

export default Footer;