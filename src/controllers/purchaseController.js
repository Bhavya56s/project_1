import asyncHandler from '../middleware/asyncHandler.js';
import IceCream from '../models/IceCream.js';
import Purchase from '../models/Purchase.js';
import User from '../models/User.js';
import ApiError from '../utils/apiError.js';


 const createPurchase = asyncHandler(async (req, res) => {
  const { iceCreamId, quantity } = req.body;
  const userId = req.user._id;

 
  const iceCream = await IceCream.findById(iceCreamId);
  if (!iceCream) {
    throw new ApiError(404, 'Ice cream not found');
  }

  const totalPrice = iceCream.price * quantity;

  const purchase = new Purchase({ userId, iceCreamId, quantity, totalPrice });
  await purchase.save();

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  user.totalAmountSpent += totalPrice;
  await user.save();

  res.status(201).json({ purchase, totalAmountSpent: user.totalAmountSpent });
});



export { createPurchase}

