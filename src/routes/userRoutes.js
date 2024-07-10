import express from 'express';
import * as userController from '../controllers/userController.js';
import { authenticateUser, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/all', authenticateUser, isAdmin, userController.getAllUsers);

export default router;
