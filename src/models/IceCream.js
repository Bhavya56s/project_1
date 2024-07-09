import mongoose from 'mongoose';

const iceCreamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const IceCream = mongoose.model('IceCream', iceCreamSchema);

export default IceCream;
