import { Router } from 'express';
import { verifyToken } from '../../middlewares/authMiddleware.js';
import { getKeys } from './stripeController.js';

const router = Router();


router.get('/keys',verifyToken , getKeys);

export default router;