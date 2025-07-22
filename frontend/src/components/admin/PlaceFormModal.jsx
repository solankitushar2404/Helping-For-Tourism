import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import toast from "react-hot-toast";

const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_Place_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const PlaceFormModal = ({ isOpen, onClose, onSuccess, place }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageFile: null,
    district: "",
    latitude: "",
    longitude: "",
  });

  const [uploading, setUploading] = useState(false);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/districts")
      .then(res => setDistricts(res.data))
      .catch(() => toast.error("Failed to load districts"));
  }, []);

  useEffect(() => {
    if (place) {
      setFormData({
        name: place.name || "",
        description: place.description || "",
        imageFile: null,
        district: place.district?._id || "",  // ✅ MUST be _id not name
        latitude: place.latitude || "",
        longitude: place.longitude || "",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        imageFile: null,
        district: "",
        latitude: "",
        longitude: "",
      });
    }
  }, [place]);

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
    data.append("folder", "places");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: data }
    );

    const result = await res.json();
    if (!res.ok) {
      throw new Error("Upload failed");
    }

    return result.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    if (!formData.district) {
      toast.error("Please select a district");
      setUploading(false);
      return;
    }

    try {
      let imageUrl = place?.image || "";
      if (formData.imageFile) {
        imageUrl = await uploadImage(formData.imageFile);
      }

      const payload = {
        name: formData.name,
        description: formData.description,
        district: formData.district, // ✅ this is _id now
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        image: imageUrl,
      };

      if (place) {
        await axios.put(`http://localhost:5000/api/admin/places/${place._id}`, payload);
        toast.success("Place updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/admin/places", payload);
        toast.success("Place created successfully");
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving place:", error);
      toast.error("Error saving place");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-xl">
        <Dialog.Title className="text-lg font-bold mb-4">
          {place ? "Edit Place" : "Create New Place"}
        </Dialog.Title>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Name" className="w-full border rounded px-3 py-2" />
          <textarea name="description" value={formData.description} onChange={handleChange} rows={3} placeholder="Description" className="w-full border rounded px-3 py-2" />
          
          <select name="district" value={formData.district} onChange={handleChange} required className="w-full border rounded px-3 py-2">
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name} ({d.state})
              </option>
            ))}
          </select>

          <input type="number" name="latitude" value={formData.latitude} onChange={handleChange} required placeholder="Latitude" className="w-full border rounded px-3 py-2" />
          <input type="number" name="longitude" value={formData.longitude} onChange={handleChange} required placeholder="Longitude" className="w-full border rounded px-3 py-2" />
          <input type="file" accept="image/*" onChange={handleChange} className="w-full border rounded px-3 py-2" />

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button type="submit" disabled={uploading} className="px-4 py-2 bg-blue-600 text-white rounded">
              {uploading ? "Uploading..." : place ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </Dialog.Panel>
    </Dialog>
  );
};

export default PlaceFormModal;
