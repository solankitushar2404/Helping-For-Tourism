import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';



import districtRoutes from './routes/districts.routes.js';
import placeRoutes from './routes/places.routes.js';
import hotelRoutes from './routes/hotels.routes.js';
import eventRoutes from './routes/events.routes.js';
import transportRoutes from './routes/transport.routes.js';
import contactRoutes from './routes/contact.routes.js';
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js"; 
import tripRoutes from './routes/trips.routes.js';
import wishlistRoutes from './routes/wishlist.routes.js';
import reviewRoutes from './routes/reviews.routes.js';
import achievementRoutes from './routes/achievements.routes.js';

import uploadRoutes from './routes/uploadImage.routes.js';

import adminRoutes from "./routes/admin.routes.js";

import adminDistrictRoutes from './routes/adminDistricts.routes.js';

import adminPlaceRoutes from './routes/adminPlace.routes.js';
import adminHotelRoutes from "./routes/adminHotel.routes.js";
import adminEventRoutes from "./routes/adminEvent.routes.js";
import adminTransportRoutes from "./routes/adminTransport.routes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Routes

app.use('/api/districts', districtRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/transport', transportRoutes);
app.use('/api/contact', contactRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use('/api/reviews', reviewRoutes);
app.use("/api/achievements", achievementRoutes);

app.use('/api/upload', uploadRoutes);

app.use("/api/admin", adminRoutes);


app.use('/api/admin/districts', adminDistrictRoutes);
app.use("/api/admin/places", adminPlaceRoutes);
app.use("/api/admin/hotels", adminHotelRoutes);
app.use("/api/admin/events", adminEventRoutes);
app.use("/api/admin/transport", adminTransportRoutes);


app.get('/', (req, res) => {
  res.send('Helping for Tourism Backend is running ✅');
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));