import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import toast from "react-hot-toast";

const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_Place_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const EventFormModal = ({ isOpen, onClose, onSuccess, event }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    start_date: "",
    end_date: "",
    district: "",
    imageFile: null,
  });

  const [districts, setDistricts] = useState([]);
  const [uploading, setUploading] = useState(false);

  // 🟩 Load Districts
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/districts")
      .then((res) => setDistricts(res.data))
      .catch(() => toast.error("Failed to load districts"));
  }, []);

  // 🟦 Pre-fill form when editing
  useEffect(() => {
    if (event) {
      setFormData({
        name: event.name || "",
        description: event.description || "",
        location: event.location || "",
        start_date: event.start_date ? event.start_date.substring(0, 10) : "",
        end_date: event.end_date ? event.end_date.substring(0, 10) : "",
        district: event.district?._id || event.district || "",
        imageFile: null,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        location: "",
        start_date: "",
        end_date: "",
        district: "",
        imageFile: null,
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, imageFile: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const uploadImage = async (imageFile) => {
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    data.append("folder", `events`);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: data }
    );
    const result = await res.json();
    if (!res.ok) throw new Error("Upload failed");
    return result.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = event?.image || "";

      if (formData.imageFile) {
        imageUrl = await uploadImage(formData.imageFile);
      }

      const payload = {
        name: formData.name,
        description: formData.description,
        location: formData.location,
        start_date: formData.start_date,
        end_date: formData.end_date,
        district: formData.district,
        image: imageUrl,
      };

      if (event) {
        await axios.put(`http://localhost:5000/api/admin/events/${event._id}`, payload);
        toast.success("Event updated");
      } else {
        await axios.post(`http://localhost:5000/api/admin/events`, payload);
        toast.success("Event created");
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Save Event Error:", error);
      toast.error("Failed to save event");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-xl">
        <Dialog.Title className="text-lg font-bold mb-4">
          {event ? "Edit Event" : "Create New Event"}
        </Dialog.Title>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Event Title"
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            required
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

          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {uploading ? "Uploading..." : event ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </Dialog.Panel>
    </Dialog>
  );
};

export default EventFormModal;