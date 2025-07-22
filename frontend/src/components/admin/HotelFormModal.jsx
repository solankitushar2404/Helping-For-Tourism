import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import toast from "react-hot-toast";

const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_Place_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const HotelFormModal = ({ isOpen, onClose, onSuccess, hotel }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    address: "",
    price_per_night: "",
    rating: "",
    district: "",
    imageFile: null,
  });

  const [uploading, setUploading] = useState(false);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/districts")
      .then((res) => setDistricts(res.data))
      .catch(() => toast.error("Failed to load districts"));
  }, []);

  useEffect(() => {
    if (hotel) {
      setFormData({
        name: hotel.name || "",
        category: hotel.category || "",
        address: hotel.address || "",
        price_per_night: hotel.price_per_night || "",
        rating: hotel.rating || "",
        district: hotel.district?._id || hotel.district || "",
        imageFile: null,
      });
    } else {
      setFormData({
        name: "",
        category: "",
        address: "",
        price_per_night: "",
        rating: "",
        district: "",
        imageFile: null,
      });
    }
  }, [hotel]);

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
    data.append("folder", "hotels");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: data }
    );

    const result = await res.json();
    if (!res.ok) {
      throw new Error("Image upload failed");
    }

    return result.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = hotel?.image || "";

      if (formData.imageFile) {
        imageUrl = await uploadImage(formData.imageFile);
      }

      const payload = {
        name: formData.name,
        category: formData.category,
        address: formData.address,
        price_per_night: parseFloat(formData.price_per_night),
        rating: parseFloat(formData.rating),
        district: formData.district,
        image: imageUrl,
      };

      if (hotel) {
        console.log("PUT URL:", `/api/admin/hotels/${hotel?._id}`);
        await axios.put(`http://localhost:5000/api/admin/hotels/${hotel._id}`, payload);
        toast.success("Hotel updated successfully");
      } else {
        await axios.post("/api/admin/hotels", payload);
        toast.success("Hotel created successfully");
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Hotel save error:", err);
      toast.error("Failed to save hotel");
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
          {hotel ? "Edit Hotel" : "Create Hotel"}
        </Dialog.Title>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Hotel Name"
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            placeholder="Hotel Type (e.g. Luxury, Budget)"
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Address"
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="number"
            name="price_per_night"
            value={formData.price_per_night}
            onChange={handleChange}
            required
            placeholder="Price per night"
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            step="0.1"
            placeholder="Rating (optional)"
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
              {uploading ? "Uploading..." : hotel ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </Dialog.Panel>
    </Dialog>
  );
};

export default HotelFormModal;
