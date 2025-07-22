import { Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const AdminNavbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-300 shadow px-4 py-3 flex justify-between items-center">
      {/* Hamburger button for mobile */}
      <button className="md:hidden" onClick={toggleSidebar}>
        <Menu className="w-6 h-6" />
      </button>

      <h1 className="text-lg font-semibold">Welcome, {user?.username}</h1>

      <button
        onClick={logout}
        className="bg-emerald-900 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
      >
        Logout
      </button>
    </header>
  );
};

export default AdminNavbar;
