const router = require("express").Router();
const User = require("../models/users")
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken")
const authMiddleware=require("../middleware/authMiddleware")



//new user registration
router.post("/register", async (req, res) => {
    try {

        //check if user already exist 
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            throw new Error("User already exist");

        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword


        //save user
        const newUser = new User(req.body);
        await newUser.save();
        res.send({
            success: true,
            message: "User created successfully."
        });

    }

    catch (error) {
      
        res.send({
            success: false,
            message: `$Server Error:{error.message}`,
        })
    }
})



//user login

router.post("/login",async(req,res)=>{
 
    try{
     
        const user=await User.findOne({email:req.body.email});
        if(!user){
            throw new Error("User not found");
        }

        //compare password
        const validPassword= await bcrypt.compare(
            req.body.password,
            user.password
        );
        if(!validPassword){
            throw new Error("Invalid password");
        }



      //create and assign token
      const token=jwt.sign({userId:user._id},process.env.TOKEN_SECRET,{expiresIn:"1d"});
    //  res.cookie("token",token);


        //send response

        res.send({
            success:true,
            message:"User logged in successfully",
            token:token
        })

    }
    catch(err){

        res.send({
            success:false,
            message: `Server Error:${err.message}`,
        })
    }

})



router.get("/getcurrentuser",authMiddleware,async (req,res)=>{
   

   try{
   
   const user=await User.findById(req.body.userId);
  
   if(!user) throw new Error("User not found!")
   
   res.send({
    success:true,
    message:"User fetched successfully",
    data:user,
   })
   }
   catch(err){
   

    res.send({
        success:false,
        message: `Server Error:${err.message}`,
    })
   }
})


// router.get("/random",async (req,res)=>{
//     const token=req.headers.authorization.split(" ")[1];
//     console.log(token);
//   return res.send({
//     msg:"hellow from random server"
//   })
// })






module.exports=router