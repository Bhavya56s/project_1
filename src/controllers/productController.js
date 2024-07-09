import asyncHandler from '../middleware/asyncHandler.js';
import IceCream from '../models/IceCream.js';
import ApiError from '../utils/apiError.js';

// Create a new ice cream (Admin only)
export const createIceCream = asyncHandler(async (req, res) => {
  const { name, price } = req.body;
  const iceCream = new IceCream({ name, price });
  await iceCream.save();
  res.status(201).json(iceCream);
});

// Update an ice cream (Admin only)
export const updateIceCream = asyncHandler(async (req, res) => {
  const { name, price } = req.body;
  const iceCream = await IceCream.findByIdAndUpdate(req.params.id, { name, price }, {
    new: true,
    runValidators: true,
  });
  if (!iceCream) {
    throw new ApiError(404, 'Ice cream not found');
  }
  res.json(iceCream);
});

// Delete an ice cream (Admin only)
export const deleteIceCream = asyncHandler(async (req, res) => {
  const iceCream = await IceCream.findByIdAndDelete(req.params.id);
  if (!iceCream) {
    throw new ApiError(404, 'Ice cream not found');
  }
  res.json(iceCream);
});
