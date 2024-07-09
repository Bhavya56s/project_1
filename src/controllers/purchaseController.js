import { User } from "../models/usermodel.js";
import { Purchase } from "../models/pruchaseModel.js";
import { IceCream } from "../models/icecreamModel.js";

const createPurchase = async (req, res) => {
  try {
    const { userId, iceCreamId, quantity } = req.body;

    const user = await User.findById(userId);
    const iceCream = await IceCream.findById(iceCreamId);

    if (!user || !iceCream) {
      return res.status(404).send({ error: 'User or Ice Cream not found' });
    }
     
    const totalPrice = iceCream.price * quantity;
    const purchase = new Purchase({ userId, iceCreamId, quantity,totalPrice });
    await purchase.save();
    user.totalAmountSpent += totalPrice;
    await user.save();
    
    res.status(201).send({ purchase, totalAmountSpent: user.totalAmountSpent });
  } catch (error) {
    console.error('Error creating purchase:', error);
    res.status(400).send(error);
  }
};
 const getPurchasesByUser = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const userPurchases = await Purchase.find({ userId });
  
      res.send(userPurchases);
    } catch (error) {
        console.error('Error creating purchase:', error);
      res.status(500).send(error);
    }
  };
const getTotalBillForUser = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const userPurchases = await Purchase.find({ userId });
  
      let totalBill = 0;
      userPurchases.forEach((purchase) => {
        totalBill += purchase.totalPrice;
      });
  
      res.send({ totalBill });
    } catch (error) {
        console.error('Error creating purchase:', error);
      res.status(500).send(error);
    }
  };

export {getPurchasesByUser,createPurchase,getTotalBillForUser}





