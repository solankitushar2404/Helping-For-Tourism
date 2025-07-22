import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, Users, Hotel, MapPinned, CalendarClock, LogOut } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-700 shadow">
        <h1 className="text-2xl font-bold tracking-wide font-fredoka">Admin Dashboard 🛠️</h1>
        <Link
          to="/"
          className="text-sm px-4 py-2 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition"
        >
          Logout <LogOut className="inline-block ml-2 w-4 h-4" />
        </Link>
      </header>

      {/* Main Grid */}
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {/* Card: Manage Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl hover:bg-gray-700 transition"
        >
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <Users className="w-5 h-5" /> Manage Users
          </h2>
          <p className="text-sm text-gray-300 mb-4">View, promote, or remove platform users.</p>
          <Link
            to="/admin/users"
            className="text-sm text-blue-400 hover:text-blue-300 font-medium"
          >
            Go to User Management →
          </Link>
        </motion.div>

        {/* Card: Manage Hotels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl hover:bg-gray-700 transition"
        >
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <Hotel className="w-5 h-5" /> Manage Hotels
          </h2>
          <p className="text-sm text-gray-300 mb-4">Add, edit, or remove hotel listings for districts.</p>
          <Link
            to="/admin/hotels"
            className="text-sm text-blue-400 hover:text-blue-300 font-medium"
          >
            Go to Hotel Management →
          </Link>
        </motion.div>

        {/* Card: Manage Destinations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl hover:bg-gray-700 transition"
        >
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <MapPinned className="w-5 h-5" /> Manage Destinations
          </h2>
          <p className="text-sm text-gray-300 mb-4">Curate tourist spots and highlight experiences.</p>
          <Link
            to="/admin/destinations"
            className="text-sm text-blue-400 hover:text-blue-300 font-medium"
          >
            Go to Destination Panel →
          </Link>
        </motion.div>

        {/* Card: Manage Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl hover:bg-gray-700 transition"
        >
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <CalendarClock className="w-5 h-5" /> Manage Events
          </h2>
          <p className="text-sm text-gray-300 mb-4">Promote upcoming events and fairs in districts.</p>
          <Link
            to="/admin/events"
            className="text-sm text-blue-400 hover:text-blue-300 font-medium"
          >
            Go to Events Manager →
          </Link>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;
