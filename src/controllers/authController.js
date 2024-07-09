import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/User.js';
import { jwtSecret } from '../config.js';
import ApiError from '../utils/ApiError.js';

 const register = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;
  
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new ApiError(400, ` already exists`);
    }
  
    const user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role,
    });
  
    await user.save();
  
    res.status(201).json({ message: `${user.role} registered succesfully` });
  });
 const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, jwtSecret, {
    expiresIn: '1h',
  });

  res.json({ token, message: `${user.role} logged in successfully` });
});

export {register,
    login
}
