import { Router } from 'express';

import {
  createEvent,
  editEvent,
  deleteEvent,
  getAllEvents,
} from '../controllers/eventController';

import authenticateJWT from '../middleware/authMiddleware';

const router = Router();

router.get('/events', getAllEvents);
router.post('/events', authenticateJWT, createEvent);
router.put('/events', authenticateJWT, editEvent);
router.delete('/events', authenticateJWT, deleteEvent);

export default router;
