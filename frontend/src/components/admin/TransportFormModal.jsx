// components/admin/TransportFormModal.jsx
import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import toast from "react-hot-toast";

const TransportFormModal = ({ isOpen, onClose, onSuccess, transport }) => {
  const [formData, setFormData] = useState({
    name: "",
    mode: "",
    from: "",
    time: "",
    link: "",
    district: "",
  });

  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load districts for dropdown
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/districts")
      .then((res) => setDistricts(res.data))
      .catch(() => toast.error("Failed to load districts"));
  }, []);

  // When editing, set form with existing data
  useEffect(() => {
    if (transport) {
      setFormData({
        name: transport.name || "",
        mode: transport.mode || "",
        from: transport.from || "",
        time: transport.time || "",
        link: transport.link || "",
        district: transport.district?._id || transport.district || "",
      });
    } else {
      // reset
      setFormData({
        name: "",
        mode: "",
        from: "",
        time: "",
        link: "",
        district: "",
      });
    }
  }, [transport]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (transport) {
        await axios.put(`/api/admin/transports/${transport._id}`, formData);
        toast.success("Transport updated");
      } else {
        await axios.post("/api/admin/transports", formData);
        toast.success("Transport created");
      }
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save transport");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-xl">
        <Dialog.Title className="text-lg font-bold mb-4">
          {transport ? "Edit Transport" : "Add Transport"}
        </Dialog.Title>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Transport Name (e.g. IndiGo Flight 6E-172)"
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            name="mode"
            value={formData.mode}
            onChange={handleChange}
            required
            placeholder="Transport Type (Air, Train, Bus)"
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            name="from"
            value={formData.from}
            onChange={handleChange}
            required
            placeholder="How to reach / Route"
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            placeholder="Time (e.g. 10:00 AM)"
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleChange}
            required
            placeholder="Booking Link"
            className="w-full border rounded px-3 py-2"
          />
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name} ({d.state})
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
              {loading ? "Saving..." : transport ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </Dialog.Panel>
    </Dialog>
  );
};

export default TransportFormModal;
