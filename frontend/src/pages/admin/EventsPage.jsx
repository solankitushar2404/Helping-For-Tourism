import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import EventsPanel from "../../components/admin/EventsPanel";
import EventFormModal from "../../components/admin/EventFormModal";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get("/api/admin/events");
      setEvents(data?.data || []); // adjust if response structure is different
    } catch {
      toast.error("Failed to load events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`/api/admin/events/${id}`);
      toast.success("Event deleted");
      fetchEvents();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Events Management</h2>
      </div>
      <EventsPanel
        events={events}
        onEdit={(event) => {
          setEditEvent(event);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
      />
      {modalOpen && (
        <EventFormModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={() => {
            setModalOpen(false);
            fetchEvents();
          }}
          event={editEvent}
        />
      )}
    </div>
  );
};

export default EventsPage;
