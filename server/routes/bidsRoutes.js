const router=require("express").Router();

const Bid=require("../models/bidModel");
const authMiddleware=require("../middleware/authMiddleware");


router.post("/place-new-bid",authMiddleware,async(req,res)=>{
 try{
    const newBid=new Bid(req.body);
    await newBid.save();
    res.send({
        success:true,
        message:"Bid placed successfully."
    })

 }catch(err){
    res.send({success:false,message:err.message});
 }

})


router.post("/get-all-bids",authMiddleware,async(req,res)=>{
    try{
        
        const {product,seller,buyer}=req.body;
        let filters={}
        if(product){
          filters.product=product
        }
        if(seller){
            filters.seller=seller
        }
        
        if(buyer){
            filters.buyer=buyer
        }
        
      const response=await Bid.find(filters).populate("product").populate("seller").populate("buyer").sort({createdAt:-1});
      res.send({success:true,data:response});

    }catch(err){
        res.send({success:false,message:err.message})
    }
})

module.exports=router