// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import DistrictPage from "./pages/DistrictPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserDashboard from "./pages/UserDashboard";
import MyTripsPage from "./pages/MyTripsPage";
import WishlistPage from "./pages/WishlistPage";
import MyReviewsPage from "./pages/MyReviewsPage";
import AchievementsPage from "./pages/AchievementsPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

import ProtectedRoute from "./components/navbar/ProtectedRoute";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import AdminDashboard from "./components/admin/AdminDashboard";

import AdminHome from "./pages/admin/AdminHome";
import DistrictsPage from "./pages/admin/DistrictsPage";
import PlacesPage from "./pages/admin/PlacesPage";
// Add more admin pages as needed

import { TooltipProvider } from "./components/ui/tooltip";
import HotelsPage from "./pages/admin/HotelsPage";
import EventsPage from "./pages/admin/EventsPage";
import TransportPage from "./pages/admin/TransportPage";

const App = () => {
  return (
    <TooltipProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/district/:districtName" element={<DistrictPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* User Dashboard Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="trips" element={<MyTripsPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="reviews" element={<MyReviewsPage />} />
          <Route path="achievements" element={<AchievementsPage />} />
        </Route>

        {/* ✅ Admin Dashboard Layout with Nested Routes */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminHome />} />
          <Route path="districts" element={<DistrictsPage />} />
          <Route path="places" element={<PlacesPage />} />
          <Route path="hotels" element={<HotelsPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="Transport" element={<TransportPage />} />
          {/* Add more nested routes like /admin/hotels, /admin/events etc. */}
        </Route>

        {/* Legacy Redirects */}
        <Route path="/wishlist" element={<Navigate to="/dashboard/wishlist" replace />} />
        <Route path="/reviews" element={<Navigate to="/dashboard/reviews" replace />} />
        <Route path="/achievements" element={<Navigate to="/dashboard/achievements" replace />} />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <h1 className="text-center p-10 text-red-500 text-xl">404 - Page Not Found</h1>
          }
        />
      </Routes>
    </TooltipProvider>
  );
};

export default App;
