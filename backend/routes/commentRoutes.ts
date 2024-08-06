import { Router } from 'express';

import authenticateJWT from '../middleware/authMiddleware';
import { createComment, deleteComment } from '../controllers/commentController';

const router = Router();

router.post('/comments', authenticateJWT, createComment);

router.delete('/comments/:commentId', authenticateJWT, deleteComment);

export default router;
