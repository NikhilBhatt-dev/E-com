import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";

// placing order using COD method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//placing order using Stripe method
const placeOrderStripe = async (req, res) => {};

//placing order using razorpay method
const placeOrderRazorpay = async (req, res) => {};

// all orders data  for  admin panel

const allOrders = async (req, res) => {};

//user order data for frontend

const userOrders = async (req, res) => {};

// update order status from admin panel

const updateOrderStatus = async (req, res) => {};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateOrderStatus,
};
