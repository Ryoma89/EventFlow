import { Router } from 'express';

import authenticateJWT from '../middleware/authMiddleware';
import { createComment } from '../controllers/commentController';

const router = Router();

router.post('/comments', authenticateJWT, createComment);

export default router;
