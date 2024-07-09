import asyncHandler from '../middleware/asyncHandler.js';
import IceCream from '../models/IceCream.js';
import Purchase from '../models/Purchase.js';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';

// Create a new purchase (User only)
export const createPurchase = asyncHandler(async (req, res) => {
  const { iceCreamId, quantity } = req.body;
  const userId = req.user._id;

  // Fetch ice cream details to get the price
  const iceCream = await IceCream.findById(iceCreamId);
  if (!iceCream) {
    throw new ApiError(404, 'Ice cream not found');
  }

  // Calculate total price based on ice cream price and quantity
  const totalPrice = iceCream.price * quantity;

  // Create new purchase record
  const purchase = new Purchase({ userId, iceCreamId, quantity, totalPrice });
  await purchase.save();

  // Update user's totalAmountSpent
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  user.totalAmountSpent += totalPrice;
  await user.save();

  res.status(201).json({ purchase, totalAmountSpent: user.totalAmountSpent });
});

// Other methods (getPurchasesByUser, getTotalBillForUser)...
