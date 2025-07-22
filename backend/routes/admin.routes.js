// backend/routes/admin.routes.js
import express from 'express';
import adminController from '../controllers/admin.controller.js';
import { protect, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Middleware for admin access
router.use(protect, isAdmin);

// District Routes
router.post('/districts', adminController.createDistrict);
router.get('/districts', adminController.getAllDistricts);
router.put('/districts/:id', adminController.updateDistrict);
router.delete('/districts/:id', adminController.deleteDistrict);

// Place Routes
router.post('/places', adminController.createPlace);
router.get('/places', adminController.getAllPlaces);
router.put('/places/:id', adminController.updatePlace);
router.delete('/places/:id', adminController.deletePlace);

// Hotel Routes
router.post('/hotels', adminController.createHotel);
router.get('/hotels', adminController.getAllHotels);
router.put('/hotels/:id', adminController.updateHotel);
router.delete('/hotels/:id', adminController.deleteHotel);

// Event Routes
router.post('/events', adminController.createEvent);
router.get('/events', adminController.getAllEvents);
router.put('/events/:id', adminController.updateEvent);
router.delete('/events/:id', adminController.deleteEvent);

// Transport Routes
router.post('/transports', adminController.createTransport);
router.get('/transports', adminController.getAllTransports);
router.put('/transports/:id', adminController.updateTransport);
router.delete('/transports/:id', adminController.deleteTransport);

// User and Review Routes
router.get('/users', adminController.getAllUsers);
router.delete('/users/:id', adminController.deleteUser);

router.get('/reviews', adminController.getAllReviews);
router.delete('/reviews/:id', adminController.deleteReview);

export default router;