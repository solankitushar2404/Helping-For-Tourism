// AdminProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminProtectedRoute = ({ children }) => {
const { user, loading, isAdmin } = useAuth();

if (loading) {
return <div>Loading...</div>;
}

if (!user) {
return <Navigate to="/login" replace />;
}

if (!isAdmin) {
return <Navigate to="/" replace />;
}

return children;
};

export default AdminProtectedRoute;
