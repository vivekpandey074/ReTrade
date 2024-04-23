const mongoose=require("mongoose");

mongoose.connect(process.env.MONGO_DB_URL);

const connection=mongoose.connection;

connection.on("connected",()=>{
    console.log("MONGODB CONNECTED SUCCESSFULLY");
})

connection.on("error",(err)=>{
    console.log(err);
})

module.exports=connection