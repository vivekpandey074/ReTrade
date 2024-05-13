const mongoose=require("mongoose")


const PaymentSchema=new mongoose.Schema({
    razorpay_order_id:{
        type:String,
        required:true
    },
    razorpay_payment_id:{
        type:String,
        required:true
    },
    razorpay_signature:{
        type:String,
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"products"
        
    }
})


const Payment=mongoose.model("payments",PaymentSchema);
module.exports=Payment;