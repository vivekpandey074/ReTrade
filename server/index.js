const express=require("express");
const app=express();

require("dotenv").config();
const dbConfig=require("./config/dbConfig")
const userRoutes=require("./routes/userRoutes")
const PORT=process.env.PORT || 5000
const cors=require("cors");



const corsOptions = {
  origin:'http://localhost:5173',
  credential:true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  exposedHeaders: ['Authorization'],
};

app.use(cors(corsOptions));

  
app.use(express.json());
app.use(express.urlencoded({extended:false}))













app.use("/api/users",userRoutes);


app.listen(PORT,()=>{
    console.log("Server Started Successfully");
})