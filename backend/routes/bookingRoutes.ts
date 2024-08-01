import { Router } from 'express';

import authenticateJWT from '../middleware/authMiddleware';
import { createBooking } from '../controllers/bookingController';

const router = Router();

router.post('/booking', authenticateJWT, createBooking);

export default router;
