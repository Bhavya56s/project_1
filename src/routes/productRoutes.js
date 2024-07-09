import express from 'express';
const router = express.Router();
import { authenticateUser, isAdmin } from '../middleware/authMiddleware.js';
import * as productController from '../controllers/productController.js';

// Admin-only routes
router.post('/icecreams', authenticateUser, isAdmin, productController.createIceCream);
router.put('/icecreams/:id', authenticateUser, isAdmin, productController.updateIceCream);
router.delete('/icecreams/:id', authenticateUser, isAdmin, productController.deleteIceCream);
// Add other product routes here

export default router;
