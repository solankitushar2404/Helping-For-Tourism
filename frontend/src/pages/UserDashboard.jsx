import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";
import { useNavigate, Link, useLocation, Outlet } from "react-router-dom";
import { BadgeCheck, Star, Map, Heart } from "lucide-react";

const cardData = [
  {
    name: "My Trips",
    description: "View and manage your saved trips and routes.",
    icon: <Map className="w-8 h-8 text-indigo-600" />,
    href: "/dashboard/trips",
    color: "from-indigo-100 to-indigo-300",
  },
  {
    name: "Wishlist",
    description: "Your dream places to visit.",
    icon: <Heart className="w-8 h-8 text-pink-500" />,
    href: "/dashboard/wishlist",
    color: "from-pink-100 to-pink-300",
  },
  {
    name: "My Reviews",
    description: "Your feedback on places, hotels, and events.",
    icon: <Star className="w-8 h-8 text-yellow-500" />,
    href: "/dashboard/reviews",
    color: "from-yellow-100 to-yellow-300",
  },
  {
    name: "Achievements",
    description: "Badges & travel stats unlocked.",
    icon: <BadgeCheck className="w-8 h-8 text-green-500" />,
    href: "/dashboard/achievements",
    color: "from-green-100 to-green-300",
  },
];

const UserDashboard = () => {
  const { user, logout, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isRootDashboard = location.pathname === "/dashboard";

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put("http://localhost:5000/api/users/profile", {
        username,
        email,
        avatar,
      });
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Profile updated successfully! 🎉");
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5000/api/upload", formData);
      setAvatar(data.url);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 min-h-screen">
      {isRootDashboard && (
        <>
          {/* Welcome Banner */}
          <motion.div
            className="bg-white rounded-3xl p-10 shadow-2xl max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 font-fredoka">
              Welcome, {user?.username?.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")} 👋
            </h2>
            <p className="text-gray-600 mt-2 text-lg">Explore your travel dashboard ✈️</p>
            {avatar && (
              <div className="flex justify-center mt-6">
                <img
                  src={avatar}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-white shadow object-cover"
                />
              </div>
            )}
            <button
              onClick={() => navigate("/")}
              className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow"
            >
              Return Home
            </button>
          </motion.div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mt-16">
            {cardData.map((card, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`rounded-2xl p-6 bg-gradient-to-br ${card.color} shadow-lg hover:ring-2 hover:ring-white transition-all`}
              >
                <Link to={card.href} className="block h-full">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="bg-white p-3 rounded-full shadow">{card.icon}</div>
                    <h3 className="text-xl font-bold text-gray-800">{card.name}</h3>
                    <p className="text-sm text-gray-700">{card.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Edit Profile Section */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8 max-w-xl mx-auto mt-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-indigo-600 text-center">Edit Profile</h3>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border rounded-xl px-4 py-2" placeholder="Username" required />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded-xl px-4 py-2" placeholder="Email" required />
              <input type="text" value={avatar} readOnly className="w-full border rounded-xl px-4 py-2 bg-gray-100 text-gray-600 cursor-not-allowed" />
              <input type="file" accept="image/*" onChange={handleFileUpload} className="w-full border rounded-xl px-4 py-2" />
              {avatar && <img src={avatar} alt="Preview" className="w-20 h-20 rounded-full object-cover mx-auto mt-4" />}
              <button type="submit" disabled={loading} className="mt-4 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full transition">
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </form>
          </motion.div>
        </>
      )}
      {/* Renders nested route components (like /dashboard/trips, /dashboard/reviews, etc.) */}
      <Outlet />
    </section>
  );
};

export default UserDashboard;
