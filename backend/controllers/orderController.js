import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// placing order using COD method
const placeOrder = async (req, res) => {

    try {
     const { address, items, amount } = req.body;
     const userId = req.userId;

    const orderData = {
      userId,
      items,
      address,
      amount:Number(amount),
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };


    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, {cartData:{}})

    res.json({success: true, message: "Order placed successfully"});


        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
        
    }

}

//placing order using Stripe method
const placeOrderStripe = async (req, res) => {

}

//placing order using razorpay method
const placeOrderRazorpay = async (req, res) => {

}


// all orders data  for  admin panel

const allOrders = async (req, res) => {
    try{
        const orders = await orderModel.find({});
        res.json({success: true, orders});

}
catch (error) {
    console.log(error);
    res.json({success: false, message: error.message});
    
}
}

//user order data for frontend

const userOrders = async (req, res) => {
    try{
        const userId = req.userId;
        const orders = await orderModel.find({userId});
        res.json({success: true, orders});

    }catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
        
    }

}


// update order status from admin panel

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        if (!orderId || !status) {
            return res.json({ success: false, message: "Order id and status are required" });
        }

        await orderModel.findByIdAndUpdate(orderId, { status });

        res.json({ success: true, message: "Order status updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateOrderStatus }
