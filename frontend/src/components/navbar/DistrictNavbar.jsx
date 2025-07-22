import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";

const DistrictNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoverProfile, setHoverProfile] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "#destinations" },
    { name: "Hotels", href: "#hotels" },
    { name: "Transport", href: "#transport" },
    { name: "Plan Your Trip", href: "#plan" },
    { name: "About Us", href: "#about" },
    { name: "Contact Us", href: "#contact" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed w-full bg-gradient-to-r from-black via-gray-900 to-black backdrop-blur-md bg-opacity-80 shadow-md z-50">
      <div className="w-full px-6">
        <div className="flex items-center h-16 w-full justify-between">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-transparent bg-gradient-to-r from-accent via-green-500 to-indigo-400 bg-clip-text font-fredoka text-2xl font-bold"
            >
              Helping for Tourism
            </Link>
          </div>

          {/* Nav Links - Center (Desktop only) */}
          <div className="hidden md:flex justify-center flex-1 space-x-6 font-overpass">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white hover:text-yellow-300 transition"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Profile / Auth Buttons - Right (hidden on mobile) */}
          <div className="hidden md:flex flex-shrink-0 items-center gap-2">
            {user ? (
              <div
                className="relative"
                onMouseEnter={() => setHoverProfile(true)}
                onMouseLeave={() => setHoverProfile(false)}
              >
                <div className="flex items-center gap-2 cursor-pointer">
                  <img
                    src={user.avatar || "/default-avatar.png"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white"
                  />
                  <span className="text-white font-medium">{user.username}</span>
                </div>

                <AnimatePresence>
                  {hoverProfile && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg py-2 z-50"
                    >
                      <Link
                        to="/dashboard"
                        className="block px-4 py-3 hover:bg-gray-100 text-heading"
                      >
                        Dashboard 🧳
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-heading hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 bg-white text-blue-800 rounded-full hover:bg-blue-200 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-yellow-400 text-blue-900 rounded-full hover:bg-yellow-300 transition"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden ml-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="md:hidden bg-gradient-to-b from-indigo-800 via-blue-800 to-cyan-800 text-white overflow-hidden"
          >
            <div className="flex flex-col items-center space-y-4 py-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white font-medium hover:text-yellow-300 transition"
                >
                  {item.name}
                </a>
              ))}

              {user ? (
                <>
                  <p className="text-white font-semibold">Hello, {user.username}</p>
                  <Link
                    to="/dashboard"
                    className="block w-full py-2 hover:text-yellow-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard 🧳
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 hover:text-red-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block py-2 hover:text-yellow-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block py-2 hover:text-yellow-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default DistrictNavbar;
