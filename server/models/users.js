const mongoose=require("mongoose");


const userSchema=new mongoose.Schema({
firstname:{
    type:String,
    required:true
},
lastname:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true
},
password:{
    type:String,
    require:true,
},
role:{
    type:String,
    default:"user",
},
status:{
    type:String,
    default:"active",
},
profilePicture:{
    type:String,
    default:""
}



},{
    timestamps:true
})


const User=mongoose.model("users",userSchema);

module.exports=User;