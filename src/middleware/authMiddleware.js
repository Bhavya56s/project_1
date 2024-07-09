import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { jwtSecret } from '../config.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from './asyncHandler.js';

// Middleware to verify JWT and authenticate user
export const authenticateUser = asyncHandler(async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Received token:', token);

  if (!token) {
    throw new ApiError(401, 'Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new ApiError(401, 'Invalid token. User not found.');
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    throw new ApiError(400, 'Invalid token.');
  }
});

// Middleware to check if the user is an admin
export const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    throw new ApiError(403, 'Access denied. Admins only.');
  }
  next();
});
