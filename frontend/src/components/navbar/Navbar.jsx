import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    setProfileMenuOpen(false);
  };

  return (
    <nav className="w-full bg-gradient-to-r from-black via-gray-900 to-black text-white shadow-xl fixed top-0 left-0 z-50 backdrop-blur-sm bg-opacity-80">
      <div className="w-full px-6">
        <div className="flex items-center justify-between h-16 w-full">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-transparent bg-gradient-to-r from-accent via-green-500 to-indigo-400 bg-clip-text font-fredoka text-2xl font-bold"
            >
              Helping for Tourism
            </Link>
          </div>

          {/* Profile or Login/Signup - Right (Visible only on md and up) */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div
                className="relative"
                onMouseEnter={() => setProfileMenuOpen(true)}
                onMouseLeave={() => setProfileMenuOpen(false)}
              >
                <div className="flex items-center gap-2 cursor-pointer">
                  <img
                    src={user.avatar || "/default-avatar.png"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white"
                  />
                  <span className="text-white font-semibold">{user.username}</span>
                </div>

                <AnimatePresence>
                  {profileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white text-black shadow-xl rounded-xl overflow-hidden border z-50"
                    >
                      <Link to="/dashboard" className="block px-4 py-3 hover:bg-gray-100">
                        Dashboard 🧳
                      </Link>
                      {user.role === "admin" && (
                        <Link to="/admin/dashboard" className="block px-4 py-3 hover:bg-gray-100">
                          Admin Panel 🛠️
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 hover:bg-gray-100 text-red-600"
                      >
                        Logout 🚪
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 bg-white text-blue-800 font-semibold rounded-xl hover:bg-blue-200 transition"
                >
                  Login 🔑
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-yellow-400 text-blue-900 font-semibold rounded-xl hover:bg-yellow-300 transition"
                >
                  Signup 📝
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 bg-gradient-to-b from-indigo-800 via-blue-800 to-cyan-800 text-white flex flex-col gap-2 font-overpass">
          {user ? (
            <>
              <p className="font-semibold">Hello, {user.username}</p>
              <Link to="/dashboard" className="block w-full py-2 hover:text-yellow-300">
                Dashboard 🧳
              </Link>
              {user.role === "admin" && (
                <Link to="/admin/dashboard" className="block w-full py-2 hover:text-yellow-300">
                  Admin Panel 🛠️
                </Link>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 hover:text-red-300"
              >
                Logout 🚪
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block w-full py-2 hover:text-yellow-300">
                Login 🔑
              </Link>
              <Link to="/signup" className="block w-full py-2 hover:text-yellow-300">
                Signup 📝
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
