import { Router } from 'express';

import {
  createEvent,
  editEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  getMyEvents,
  getMyAttendingEvents,
  getTrendingEvents,
} from '../controllers/eventController';

import authenticateJWT from '../middleware/authMiddleware';

const router = Router();

router.get('/events', getAllEvents);
router.get('/my-events', authenticateJWT, getMyEvents);
router.get('/my-attending-events', authenticateJWT, getMyAttendingEvents);
router.get('/trending-events' , getTrendingEvents);
router.get('/events/:eventId', getEventById);
router.post('/events', authenticateJWT, createEvent);
router.put('/events', authenticateJWT, editEvent);
router.delete('/events', authenticateJWT, deleteEvent);

export default router;
