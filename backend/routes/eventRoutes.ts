import { Router } from 'express';

import { createEvent, editEvent } from '../controllers/eventController';

const router = Router();

router.post('/events', createEvent);
router.put('/events/:eventId', editEvent);

export default router;
