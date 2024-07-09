import express from 'express';
const router = express.Router();
import { authenticateUser } from '../middleware/authMiddleware.js';
import * as purchaseController from '../controllers/purchaseController.js';



router.post('/create', authenticateUser, purchaseController.createPurchase);

export default router;
