import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";


// global variable
const currency = "inr";
const deliveryCharges = 10;
const minimumStripeAmount = 50;

// Create Stripe only when needed, after env vars are available.
const getStripeInstance = () => {
    if (!process.env.STRIPE_SECRET_KEY) {
        return null;
    }

    return new Stripe(process.env.STRIPE_SECRET_KEY);
};

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
    try {
         const stripe = getStripeInstance();
         const userId = req.userId;

         if (!stripe) {
            return res.json({ success: false, message: "Stripe is not configured" });
         }

         if (!userId) {
            return res.json({ success: false, message: "User authentication required" });
         }

         const { address, items, amount } = req.body;
         const numericAmount = Number(amount);

         if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
            return res.json({
                success: false,
                message: "Invalid order amount",
            });
         }

         if (numericAmount < minimumStripeAmount) {
            return res.json({
                success: false,
                message: `For Stripe payment, minimum order amount is ${currency.toUpperCase()} ${minimumStripeAmount}`,
            });
         }

         const {origin} = req.headers

           const orderData = {
             userId,
             items,
             address,
             amount: numericAmount,
             paymentMethod: "Stripe",
             payment: false,
             date: Date.now(),
          };



         const newOrder = new orderModel(orderData);
         await newOrder.save();

         const line_items = items.map((item) => ({

            price_data: {
                currency:currency,
                product_data: {
                    name: item.name,

                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
         }));

         line_items.push({
            price_data: {
                currency:currency,
                product_data: {
                    name: 'Delivery Charges',

                },
                unit_amount: deliveryCharges * 100,
            },
            quantity: 1,

         })
         


         const session = await stripe.checkout.sessions.create({
            
            
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id} `,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id} `,
            line_items,
            mode: "payment",
           
         });
         res.json({success: true, session_url: session.url});
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
        
    }

}


//verify stripe 

const verifyStripe = async (req, res) => {
    const {orderId,success,user_id,} = req.body

    try{
        if(success === "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            await userModel.findByIdAndUpdate(user_id, {cartData:{}})
            res.json({success: true, message: "Order placed successfully"});
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success: false, message: "Order placed failed"});
        }

    }
    catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
        
    }
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


export {verifyStripe, placeOrder, placeOrderStripe,  allOrders, userOrders, updateOrderStatus }
