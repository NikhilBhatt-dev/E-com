import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        },
        items : {
            type : Array,
            required : true
        },
        amount : {
            type : Number,
            required : true
        },
        address : {
            type : Object,
            required : true
        },
        status : {
            type : String,
            default : 'Order Placed',
            required : true
        },
        paymentMethod: {
            type: Boolean,
            required: true
        },
        payment : {
            type: Boolean,
            required: true,
            default: false
        },
        date : {
            type : Number,
            required : true

        }


});


const ordeModel =  mongoose.models.orders || mongoose.model("orders", orderSchema);

export default ordeModel;