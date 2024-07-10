import asyncHandler from '../middleware/asyncHandler.js';
import IceCream from '../models/IceCream.js';
import ApiError from '../utils/apiError.js';

 const createIceCream = asyncHandler(async (req, res) => {
  const { name, price } = req.body;
  const iceCream = new IceCream({ name, price });
  await iceCream.save();
  res.status(201).json(iceCream);
});


 const updateIceCream = asyncHandler(async (req, res) => {
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


 const deleteIceCream = asyncHandler(async (req, res) => {
  const iceCream = await IceCream.findByIdAndDelete(req.params.id);
  if (!iceCream) {
    throw new ApiError(404, 'Ice cream not found');
  }
  res.json(iceCream);
});


const selectIceCream = asyncHandler(async(req,res) =>{
  const iceCreams = await IceCream.find();
  res.status(200).json(iceCreams);
})

export {
  createIceCream,
  updateIceCream,
  deleteIceCream,
  selectIceCream
}
