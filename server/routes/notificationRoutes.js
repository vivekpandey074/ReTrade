const authMiddleware = require("../middleware/authMiddleware");
const Notification = require("../models/notificationModels");

const router=require("express").Router();

//add a notification
router.post("/notify",authMiddleware,async(req,res)=>{
  try{
    const newNotifcation=new Notification(req.body);
    await newNotifcation.save();

    res.send({
        success:true,
        message:"Notification addede successfully"
    })
  }catch(err){
    res.send({
        success:false,
        message:err.message,
    })
  }
})

//get all notifiation by user
router.get("/get-all-notifications",authMiddleware,async(req,res)=>{
 
    try{
        const notifications=await Notification.find({user:req.body.userId}).sort({createdAt:-1})
        res.send({
            success:true,
            data:notifications
        })

    }catch(err){
        res.send({
            success:false,
            message:err.message,
        })
    }

})



//deleting notification
//not using for now
router.delete("/delete-notification/:id",authMiddleware,async(req,res)=>{
    try{
        await Notification.findByIdAndDelete(req.params.id);
        res.send({
            success:true,
            message:"Notification deleted successfully",
        })

    }catch(err){
        res.send({
            success:false,
            message:err.message,
        })

    }
})

//read all notification

router.put("/read-all-notifications",authMiddleware,async(req,res)=>{
    try{
    await Notification.updateMany(
        {user:req.body.userId,read:false},
        {$set:{read:true}}
  )

  res.send({
    success:true,
    message:"All notifications message marked as read"
  })
    }
    catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }
})

module.exports=router;