import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import EventFormModal from "./EventFormModal";

const EventsPanel = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editEvent, setEditEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:5000/api/admin/events");
      setEvents(data);
    } catch (err) {
      toast.error("Failed to fetch events");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/events/${id}`);
      toast.success("Event deleted");
      fetchEvents();
    } catch (err) {
      toast.error("Delete failed");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold">Use this section to maintain your event database.</h3>
        <Button
          onClick={() => {
            setEditEvent(null);
            setModalOpen(true);
          }}
        >
          + New Event
        </Button>
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card key={event._id} className="relative">
              <CardContent className="p-4">
                <img
                  src={event.image || "/placeholder.jpg"}
                  alt={event.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-bold mb-1">{event.name}</h3>
                <p className="text-sm text-muted-foreground mb-1">
                  Location: {event.location || "-"}
                </p>
                <p className="text-sm text-muted-foreground mb-1">
                  Date: {new Date(event.start_date).toLocaleDateString()} to {new Date(event.end_date).toLocaleDateString()}
                </p>

                <div className="flex gap-3 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditEvent(event);
                      setModalOpen(true);
                    }}
                  >
                    <Pencil size={16} /> Edit
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(event._id)}>
                    <Trash2 size={16} /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

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

export default EventsPanel;