const router=require("express").Router();
const Product=require("../models/productModel");
const authMiddleware=require("../middleware/authMiddleware");
const cloudinary=require("../config/cloudinaryConfig")
const multer=require("multer")
const fs=require("fs");
const path=require("path")
router.post("/addproduct",authMiddleware,async (req,res)=>{
    try{
         const newProduct=new Product(req.body);
         await newProduct.save();
         res.send({
            success:true,
            message:"Product added successfully",
            data:newProduct,
         })
    }catch(err){
        res.send({
            success:false,
            message:err.message,
        })
    }
})

router.get("/getproducts",authMiddleware,async (req,res)=>{
    try{
        const products=await Product.find().sort({createdAt:-1});
        res.send({
            success:true,
            products,
        });
      
    }
    catch(error){
      res.send({
        success:false,
        message:err.message,
      })
    }
})


router.delete("/delete/:id",authMiddleware,async (req,res)=>{
    try{
    await Product.findByIdAndDelete(req.params.id)
    res.send({
        success:true,
        message:"Product Deleted Succesfully."
    })


    }catch(err){

       res.send({
        success:false,
        messsage:err.message
       })


    }

})

router.put("/update/:id",authMiddleware,async(req,res)=>{
    try{
     
      const updatedProduct= await Product.findByIdAndUpdate(req.params.id,req.body,{ new: true });
      
      if(!updatedProduct) throw new Error("Product not found!");

      res.send({
        success:true,
        message:"Product Updated Successfully!.",
        data:updatedProduct,
      })

    }catch(err){
        res.send({
            success:false,
            message:err.message,
        })
    }
})




//saving file to localserver

const storage=multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/productImages')
      },
      filename: function (req, file, cb) {
        cb(null, Date.now()+"-"+file.originalname);
      }
    
})

const upload=multer({
    storage:storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true) 
    },
    limits:{
        fileSize: 1024 * 1024
    }

}).single('file')

router.post(`/upload-product-image/:id`,authMiddleware,upload,async(req,res)=>{
   

try {
    
    
    const response= await cloudinary.uploader.upload(req.file.path,{
        folder:"ReTrade"
    });
    const productId=req.params.id;
    await Product.findByIdAndUpdate(productId,{
        $push:{Images:response.secure_url}
    })


    fs.unlinkSync(req.file.path)// this will make sure once file get upload to cloudinary it get removed from serverlocalstorage
    res.send({
        success:true,
        message:"Image Uploaded successfully",
        response,
    })
    
} catch (error) {
    fs.unlinkSync(req.file.path)// this will make sure once file get upload to cloudinary it get removed from serverlocalstorage
    res.send({
        success:false,
        message:error.message
    })
    
}
})


router.put("/deleteimage/:id",authMiddleware,async (req,res)=>{
    try{
       
      const newImageArray=req.body.slice(0, -1)
      console.log(newImageArray)
      const response=await Product.findByIdAndUpdate(req.params.id,{
        $set:{
            Images:newImageArray
        }
      },{new:true})


      res.send({
        success:true,
        message:"Image delete succesfully",
        response,
      })
    }catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }
})


module.exports=router;