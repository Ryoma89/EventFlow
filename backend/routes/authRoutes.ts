import { Router } from 'express';
import { signUp, signIn, signOut, checkAuth } from '../controllers/authController';

const router = Router();

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.post('/sign-out', signOut);
router.post('/auth', checkAuth);

export default router;
