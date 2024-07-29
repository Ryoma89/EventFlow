import { Router } from 'express';

import {
  createEvent,
  editEvent,
  deleteEvent,
} from '../controllers/eventController';

const router = Router();

router.post('/events', createEvent);
router.put('/events', editEvent);
router.delete('/events', deleteEvent);

export default router;
