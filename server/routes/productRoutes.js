const router=require("express").Router();
const Product=require("../models/productModel");
const authMiddleware=require("../middleware/authMiddleware");
const cloudinary=require("../config/cloudinaryConfig")
const Notification=require("../models/notificationModels")
const User=require("../models/users")
const multer=require("multer")
const fs=require("fs");
const path=require("path")
router.post("/addproduct",authMiddleware,async (req,res)=>{
    try{
        
         const newProduct=new Product(req.body);
         await newProduct.save();


        //send notitfication to all admins that new product has been added by some user allow, or reject it
        const admins=await User.find({role:"admin"});

        admins.forEach(async (admin)=>{
            const newNotification=new Notification({
                user:admin._id,
                message:`New Product for approval`,
                title:"New Product",
                onClick:"/admin",
                read:false,
            })

            await newNotification.save();
        })


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

router.post("/getproducts",async (req,res)=>{

    try{
        const {Status,Seller,Category,Age,Price,SortOrder,SearchQuery}=req.body;
        
        let filters={}
        let products=[];
    
      if(Age && Price){
        let pipelineObj={}
        let SearchObj={}
        let sortObj={
            "$sort":{
                'createdAt':-1,
            }
        }

       if(SearchQuery!=""){
         SearchObj=
            {
                '$match': {
                  '$text':{
                    '$search':SearchQuery
                  }
                }
             }
        
       }



        switch (SortOrder) {
        case "PriceOrderLTH":
            sortObj= {
                "$sort":{
                    'Price':1,
                }
            }
            break;
       case "PriceOrderHTL":
        sortObj={
            "$sort":{
                'Price':-1,
            }
        }
        break;

        case "AGE":
            sortObj={
                "$sort":{
                    'Age':1,
                }
            }
            break;
        case "RECENT":
            sortObj={
                "$sort":{
                    'createdAt':-1,
                }
            }

        default:
            break;
       }
        
        
       if(Category){ 
       
        pipelineObj=  {
            '$match': {
              'Category':Category,
              'Age': {
                '$lt': parseInt(Age)
              }, 
              'Price': {
                '$lt': parseInt(Price)
              }
            },
            
          }
      
    }else{
       
        pipelineObj= {
            '$match': {
              'Age': {
                '$lt': parseInt(Age),
              }, 
              'Price': {
                '$lt': parseInt(Price),
              }
            },
            
          }


    }
    if(SearchQuery!="") products=await Product.aggregate([SearchObj,pipelineObj,sortObj])
   else  products=await Product.aggregate([pipelineObj,sortObj])
   
    
   
      }
    //   This else block run on initial use Effect run , when age & price are not set,once user click on filter or use sort dropdown Price and age will be set and above if block will run
      else{
        
       
        
        // if(Category){
        //     filters.Category=Category;
        // }
        
        if(Seller){
            //profile page will request based on seller
            filters.Seller=Seller;
        }
        if(Status){
            //home page will require only status "approved one"
            filters.Status=Status;
        }
         products=await Product.find(filters).populate("Seller").sort({createdAt:-1});
        
      }
   
        res.send({
            success:true,
            products,
        });
      
    }
    catch(err){
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
    
} catch (err) {
    fs.unlinkSync(req.file.path)// this will make sure once file get upload to cloudinary it get removed from serverlocalstorage
    res.send({
        success:false,
        message:err.message
    })
    
}
})


router.put("/deleteimage/:id",authMiddleware,async (req,res)=>{
    try{
       
      const newImageArray=req.body.slice(0, -1)
      
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




//updating product status in admin

router.put("/update-product-status/:id",authMiddleware,async (req,res)=>{
  try{
     const {Status}=req.body;
     const updatedProduct=await Product.findByIdAndUpdate(req.params.id,{Status},{new:true});


      //send notification to seller about product status update blocked,allowed or whatever
      const newNotification=new Notification({
        user:updatedProduct.Seller,
        message:`Your product ${updatedProduct.Name} has been ${req.body.Status}`,
        title:`Product Status Updated`,
        onClick:"/profile",
        read:false,
      })

      await newNotification.save();


     res.send({
        success:true,
        message:"Product status updated successfully."
     })

  }catch(err){
   res.send({
    success:false,
    message:err.message,
   })
  }

})


//get a product by id
router.get("/get-product-by-id/:id",async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id).populate("Seller");
        res.send({
            success:true,
            data:product,
        })

    }catch(err){
        res.send({
            success:false,
            message:err.message
        })

    }
})




module.exports=router;