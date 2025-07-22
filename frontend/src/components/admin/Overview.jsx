import {
  MapPin,
  Building2,
  BedDouble,
  CalendarCheck,
  BusFront,
  Users2,
  MessageSquareText,
} from "lucide-react";

const stats = [
  { title: "Total Districts", value: 13, icon: <MapPin className="w-6 h-6" />, color: "bg-blue-100 text-blue-700" },
  { title: "Total Places", value: 152, icon: <Building2 className="w-6 h-6" />, color: "bg-green-100 text-green-700" },
  { title: "Total Hotels", value: 89, icon: <BedDouble className="w-6 h-6" />, color: "bg-yellow-100 text-yellow-700" },
  { title: "Total Events", value: 24, icon: <CalendarCheck className="w-6 h-6" />, color: "bg-purple-100 text-purple-700" },
  { title: "Transport Options", value: 45, icon: <BusFront className="w-6 h-6" />, color: "bg-pink-100 text-pink-700" },
  { title: "Registered Users", value: 1043, icon: <Users2 className="w-6 h-6" />, color: "bg-indigo-100 text-indigo-700" },
  { title: "Total Reviews", value: 289, icon: <MessageSquareText className="w-6 h-6" />, color: "bg-teal-100 text-teal-700" },
];

const Overview = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white shadow rounded-2xl p-4 flex items-center space-x-4 hover:shadow-md transition"
        >
          <div className={`p-3 rounded-full ${stat.color}`}>{stat.icon}</div>
          <div>
            <p className="text-sm text-gray-500">{stat.title}</p>
            <p className="text-xl font-bold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Overview;
