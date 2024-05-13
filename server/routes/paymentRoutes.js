const router=require("express").Router();

const Razorpay=require("razorpay")

const crypto=require("crypto");

const Payment=require("../models/paymentModel");

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
     key_secret: process.env.RAZORPAY_API_SECRET
    })
   
    
router.post("/checkout",async(req,res)=>{

try{
    
    
    const options={
        amount:Number(req.body.amount*100),
        currency:"INR",
    }
    
    const order=await instance.orders.create(options)
    res.send({
        success:true,
        data:order
    })
}catch(err){
    res.send({
        success:false,
        message:err.message
    })
}
})

router.post("/payment-verification/:id",async(req,res)=>{
 
try{
   
  const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;

  const body=razorpay_order_id+"|"+razorpay_payment_id;

  const expectedSignature=crypto.createHmac("sha256",process.env.RAZORPAY_API_SECRET).update(body.toString()).digest("hex")

  const isAuthentic=expectedSignature===razorpay_signature

  if(isAuthentic){
    //save in Db
    await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        product:req.params.id
    })

   res.redirect(`http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`)
  }else{

    res.send({
        success:false,
        message:"Payment Unsuccessfull:Suspicious Payment Attempted."
    })

  }

}catch(err){
    res.send({
        success:false,
        message:err.message
    })
}
})



router.get("/get-key",async(req,res)=>{
    return res.send({key:process.env.RAZORPAY_API_KEY})
})




router.post("/Check-Soldout",async(req,res)=>{
    const {product}=req.body
    try{
        
     const document =await Payment.findOne({
            product:product,
        })
      
    if(document){
        res.send({
            success:true,
            data:true,
        })
    }else{
        throw new Error("No document found!!.");
    }


    }catch(err){
        res.send({
            success:false,
            message:err
        })
    }


})


module.exports=router;