// controllers/adminDistricts.controller.js
import District from '../models/District.js';
import cloudinary from '../utils/cloudinary.js';

const uploadToCloudinary = (fileBuffer) => {
return new Promise((resolve, reject) => {
cloudinary.uploader.upload_stream(
{ folder: 'districts' },
(error, result) => {
if (error) return reject(error);
resolve(result.secure_url);
}
).end(fileBuffer);
});
};

export const createDistrict = async (req, res) => {
try {
const { name, state, heroName, heroDescription } = req.body;

csharp
Copy
Edit
let heroImage = '';
if (req.file) {
  heroImage = await uploadToCloudinary(req.file.buffer);
}

const newDistrict = new District({
  name,
  state,
  hero: {
    name: heroName,
    image: heroImage,
    description: heroDescription,
  },
});

await newDistrict.save();
res.status(201).json(newDistrict);
} catch (error) {
console.error('Create Error:', error);
res.status(500).json({ error: 'Failed to create district' });
}
};

export const updateDistrict = async (req, res) => {
try {
const { id } = req.params;
const { name, state, heroName, heroDescription, existingImage } = req.body;

php
Copy
Edit
let heroImage = existingImage || '';

if (req.file) {
  heroImage = await uploadToCloudinary(req.file.buffer);
}

const updated = await District.findByIdAndUpdate(
  id,
  {
    name,
    state,
    hero: {
      name: heroName,
      image: heroImage,
      description: heroDescription,
    },
  },
  { new: true }
);

res.json(updated);
} catch (error) {
console.error('Update Error:', error);
res.status(500).json({ error: 'Failed to update district' });
}
};

export const deleteDistrict = async (req, res) => {
try {
const { id } = req.params;
await District.findByIdAndDelete(id);
res.json({ message: 'District deleted successfully' });
} catch (error) {
console.error('Delete Error:', error);
res.status(500).json({ error: 'Failed to delete district' });
}
};