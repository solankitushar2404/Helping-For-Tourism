import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { X } from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { user } = useAuth();

  const menu = [
    { label: "Overview", path: "/admin/dashboard" },
    { label: "Districts", path: "/admin/districts" },
    { label: "Places", path: "/admin/places" },
    { label: "Hotels", path: "/admin/hotels" },
    { label: "Events", path: "/admin/events" },
    { label: "Transport", path: "/admin/transport" },
  ];

  return (
    <aside
      className={`fixed z-50 inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 md:relative md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Mobile close button */}
      <div className="md:hidden flex justify-end p-4">
        <button onClick={() => setIsOpen(false)}>
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-2">
          {menu.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block px-4 py-2 rounded-lg hover:bg-gray-200 ${
                  location.pathname === item.path ? "bg-gray-200 font-semibold" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-sm text-gray-500">
          Logged in as <span className="font-medium">{user?.username}</span>
          <a
            href="/"
            className="bg-gray-100 text-black mx-1 px-2 py-2 rounded  hover:bg-gray-300 text-shadow-md"
          >
            HomePage
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
