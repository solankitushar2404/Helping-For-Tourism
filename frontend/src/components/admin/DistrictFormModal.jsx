import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import toast from "react-hot-toast";

const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_District_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const DistrictFormModal = ({ isOpen, onClose, onSuccess, district }) => {
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    heroName: "",
    heroImageFile: null,
    heroDescription: "",
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (district) {
      setFormData({
        name: district.name || "",
        state: district.state || "",
        heroName: district.hero?.name || "",
        heroImageFile: null,
        heroDescription: district.hero?.description || "",
      });
    } else {
      setFormData({
        name: "",
        state: "",
        heroName: "",
        heroImageFile: null,
        heroDescription: "",
      });
    }
  }, [district]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, heroImageFile: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };


  const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", "hero"); // 👈 This specifies the Cloudinary folder

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return data.secure_url;
  } catch (err) {
    console.error("Upload failed:", err);
    throw err;
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let heroImageUrl = district?.hero?.image || "";

      if (formData.heroImageFile) {
        heroImageUrl = await uploadImage(formData.heroImageFile);
      }

      const payload = {
        name: formData.name,
        state: formData.state,
        hero: {
          name: formData.heroName,
          image: heroImageUrl,
          description: formData.heroDescription,
        },
      };

      if (district) {
        await axios.put(`http://localhost:5000/api/admin/districts/${district._id}`, payload);
        toast.success("District updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/admin/districts", payload);
        toast.success("District created successfully");
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving district:", error);
      toast.error("Error saving district");
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
          {district ? "Edit District" : "Create New District"}
        </Dialog.Title>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              District Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Hero Section
            </h3>

            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hero Title
                </label>
                <input
                  type="text"
                  name="heroName"
                  value={formData.heroName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Hero Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hero Description
                </label>
                <textarea
                  name="heroDescription"
                  value={formData.heroDescription}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              {uploading ? "Uploading..." : district ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </Dialog.Panel>
    </Dialog>
  );
};

export default DistrictFormModal;
