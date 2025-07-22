import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import TransportsPanel from "../../components/admin/TransportsPanel";
import TransportFormModal from "../../components/admin/TransportFormModal";

const TransportPage = () => {
  const [transports, setTransports] = useState([]);
  const [editTransport, setEditTransport] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchTransports = async () => {
    try {
      const { data } = await axios.get("/api/admin/transports");
      setTransports(data?.data || []);
    } catch {
      toast.error("Failed to load transport data");
    }
  };

  useEffect(() => {
    fetchTransports();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transport?")) return;
    try {
      await axios.delete(`/api/admin/transports/${id}`);
      toast.success("Transport deleted");
      fetchTransports();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Transports Management</h2>
      </div>
      <TransportsPanel
        transports={transports}
        onEdit={(transport) => {
          setEditTransport(transport);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
      />
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

export default TransportPage;