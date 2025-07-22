import { useState } from 'react';
import axios from 'axios';

const ImageUploader = () => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setUrl(res.data.url);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload image');
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={(e) => handleUpload(e.target.files[0])} />
      {error && <p className="text-red-500">{error}</p>}
      {url && <img src={url} alt="Uploaded" width={200} />}
    </div>
  );
};

export default ImageUploader;
