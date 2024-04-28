const jwt=require("jsonwebtoken");

module.exports=(req,res,next)=>{
    try{
       
     
    //   const token=req.headers.cookie.split("=")[1]
        const token=req.headers.authorization.split(" ")[1].slice(1,-1);
      
    
  

        const decryptedToken=jwt.verify(token,process.env.TOKEN_SECRET)
      
       
        
        req.body.userId=decryptedToken.userId
       
        next();
    }catch(err){

        
       res.send({
        success:false,
        message: `Server Error:${err.message}`,
       })
    }
}


