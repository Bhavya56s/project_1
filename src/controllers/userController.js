import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/User.js';


export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

