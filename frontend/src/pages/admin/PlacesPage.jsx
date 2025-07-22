// src/pages/admin/PlacesPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import PlacesPanel from "../../components/admin/PlacesPanel";
import PlaceFormModal from "../../components/admin/PlaceFormModal";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const [editPlace, setEditPlace] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchPlaces = async () => {
    try {
      const { data } = await axios.get("/api/admin/places");
      setPlaces(data);
    } catch {
      toast.error("Failed to load places");
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`/api/admin/places/${id}`);
      toast.success("Place deleted");
      fetchPlaces();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Places Management</h2>
      </div>
      <PlacesPanel
        places={places}
        onEdit={(place) => {
          setEditPlace(place);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
      />
      {modalOpen && (
        <PlaceFormModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={() => {
            setModalOpen(false);
            fetchPlaces();
          }}
          place={editPlace}
        />
      )}
    </div>
  );
};

export default PlacesPage;
