import { Router } from 'express';
import { signUp, signIn, signOut } from '../controllers/authController';

const router = Router();

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.post('/sign-out', signOut);

export default router;
