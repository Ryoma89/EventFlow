import { Router } from 'express';
import { getUser, editUser, deleteUser } from '../controllers/userController';
import authenticateJWT from '../middleware/authMiddleware';

const router = Router();

router.get('/users/:userId', getUser);
router.put('/users/:userId', authenticateJWT, editUser);
router.delete('/users/:userId', authenticateJWT, deleteUser);

export default router;
