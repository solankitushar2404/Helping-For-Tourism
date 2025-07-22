// src/pages/admin/HotelsPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import HotelsPanel from "../../components/admin/HotelsPanel";
import HotelFormModal from "../../components/admin/HotelFormModal";

const HotelsPage = () => {
  const [hotels, setHotels] = useState([]);
  const [editHotel, setEditHotel] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchHotels = async () => {
    try {
      const { data } = await axios.get("/api/admin/hotels");
      setHotels(data);
    } catch {
      toast.error("Failed to load hotels");
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hotel?")) return;
    try {
      await axios.delete(`/api/admin/hotels/${id}`);
      toast.success("Hotel deleted");
      fetchHotels();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Hotels Management</h2>
      </div>
      <HotelsPanel
        hotels={hotels}
        onEdit={(hotel) => {
          setEditHotel(hotel);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
      />
      {modalOpen && (
        <HotelFormModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={() => {
            setModalOpen(false);
            fetchHotels();
          }}
          hotel={editHotel}
        />
      )}
    </div>
  );
};

export default HotelsPage;
