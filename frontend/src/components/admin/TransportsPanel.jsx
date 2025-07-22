// components/admin/TransportsPanel.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Pencil, Trash2 } from "lucide-react";
import TransportFormModal from "./TransportFormModal";

const TransportsPanel = () => {
  const [transports, setTransports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTransport, setEditTransport] = useState(null);

  const fetchTransports = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:5000/api/admin/transports");
      setTransports(data);
    } catch (err) {
      toast.error("Failed to fetch transport options");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transport option?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/transports/${id}`);
      toast.success("Transport deleted");
      fetchTransports();
    } catch (err) {
      toast.error("Delete failed");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTransports();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Use this section to maintain your transport database.</h2>
        <Button
          onClick={() => {
            setEditTransport(null);
            setModalOpen(true);
          }}
        >
          + New Transport
        </Button>
      </div>

      {loading ? (
        <p>Loading transport options...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {transports.map((t) => (
            <Card key={t._id} className="relative">
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-1">{t.name}</h3>
                <p className="text-sm text-muted-foreground">Mode: {t.mode}</p>
                <p className="text-sm text-muted-foreground">Route: {t.from}</p>
                <p className="text-sm text-muted-foreground">Time: {t.time}</p>
                <a href={t.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  Visit Booking Site
                </a>

                <div className="flex gap-3 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditTransport(t);
                      setModalOpen(true);
                    }}
                  >
                    <Pencil size={16} /> Edit
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(t._id)}>
                    <Trash2 size={16} /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {modalOpen && (
        <TransportFormModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={() => {
            setModalOpen(false);
            fetchTransports();
          }}
          transport={editTransport}
        />
      )}
    </div>
  );
};

export default TransportsPanel;
