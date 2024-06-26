const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
    seller:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"users"
    },
    buyer:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"users"
    },
    Bid:{
      type:Number,
      required:true,
    },
    Message:{
      type:String,
      required:true,
    }

  },
  {
    timestamps: true,
  }
);

module.exports=mongoose.model('bids',bidSchema);