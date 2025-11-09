import { Router } from 'express';
import { verifyToken } from '../../middlewares/authMiddleware.js';
import { createPaymentIntent, getKeys } from './stripeController.js';

const router = Router();


router.get('/keys',verifyToken , getKeys);
router.post('/payment-intent',verifyToken , createPaymentIntent);

export default router;