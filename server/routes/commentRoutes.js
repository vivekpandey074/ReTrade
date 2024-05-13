const authMiddleware = require("../middleware/authMiddleware");
const Comment = require("../models/commentModel");

const router=require("express").Router();


router.post("/placecomment",authMiddleware,async(req,res)=>{
 try{
  const newComment=new Comment(req.body);
  await newComment.save();

  res.send({
    success:true,
    message:"Comment Added Succesfully."
  })

 }catch(err){
 res.send({
    success:false,
    message:err.message
 })

 }

})


router.post("/get-all-comments",authMiddleware,async(req,res)=>{
    try {
        let filter={};
        const {product}=req.body;
        
        if(product){
            filter.product=product
        }
        
        const response=await Comment.find(filter).populate("user").populate("product")
        res.send({
            success:true,
            message:"Comment fetched successfully.",
            data:response,
        })
    } catch (err) {
        res.send({
            success:false,
            message:err.message
        })
    }
})











module.exports=router;