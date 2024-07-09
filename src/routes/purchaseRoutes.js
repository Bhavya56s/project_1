import express from 'express';
const router = express.Router();
import { authenticateUser } from '../middleware/authMiddleware.js';
import * as purchaseController from '../controllers/purchaseController.js';

// Protect purchase routes
router.post('/purchases', authenticateUser, purchaseController.createPurchase);
// Add other purchase routes here

export default router;
