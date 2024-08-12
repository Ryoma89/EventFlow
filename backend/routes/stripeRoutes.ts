import { Router } from 'express';
import express from 'express';
import {
  createCheckoutSession,
  stripeWebhook,
} from '../controllers/stripeController';
import authenticateJWT from '../middleware/authMiddleware';

const router = Router();

router.post('/create-checkout-session', authenticateJWT, createCheckoutSession);

router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  stripeWebhook
);

export default router;
