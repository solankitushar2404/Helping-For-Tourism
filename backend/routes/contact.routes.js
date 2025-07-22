// backend/routes/contact.routes.js

import express from 'express';
import { createContact, getAllContacts } from '../controllers/contact.controller.js';

const router = express.Router();

// POST - Save Contact Message
router.post('/', createContact);

// (Optional) GET - Fetch All Contacts (For Admin Panel)
router.get('/', getAllContacts);

export default router;
