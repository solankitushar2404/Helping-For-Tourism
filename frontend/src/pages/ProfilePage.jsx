import React, { useState } from 'react';
import ImageCropper from '../components/ImageCropper';
import axios from 'axios';

const ProfilePage = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [username, setUsername] = useState('meet_vaghasiya');
  const [email, setEmail] = useState('meet@example.com');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedImgUrl) => {
    setCroppedImage(croppedImgUrl);
    setShowCropper(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);

      if (croppedImage) {
        const blob = await fetch(croppedImage).then(res => res.blob());
        formData.append('avatar', blob, 'avatar.jpg');
      }

      const res = await axios.post('http://localhost:5000/api/profile/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

      <div className="mb-4">
        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200">
          {croppedImage ? (
            <img src={croppedImage} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-sm text-gray-500">No Image</div>
          )}
        </div>
        <label className="mt-2 inline-block cursor-pointer text-blue-600">
          Change Profile Picture
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>
      </div>

      {showCropper && (
        <ImageCropper
          imageSrc={imageSrc}
          onCropComplete={handleCropComplete}
          onCancel={() => setShowCropper(false)}
        />
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium">Username</label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Email</label>
          <input
            type="email"
            className="border rounded px-3 py-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
