const mongoose=require("mongoose");

const commentSchema=new mongoose.Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users"
},
message:{
    type:String,
    required:true,
},
product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"products"
}

},{
    timestamps:true
})

const Comment=mongoose.model("comments",commentSchema);

module.exports=Comment