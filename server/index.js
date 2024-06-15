const express=require("express");
const app=express();

require("dotenv").config();
const dbConfig=require("./config/dbConfig")
const userRoutes=require("./routes/userRoutes")
const productRoutes=require("./routes/productRoutes")
const bidsRoutes=require("./routes/bidsRoutes")
const notificationRoutes=require("./routes/notificationRoutes")
const commentRoutes=require("./routes/commentRoutes")
const paymentRoutes=require("./routes/paymentRoutes")


const PORT=process.env.PORT || 5000
const cors=require("cors");


  

const corsOptions = {
  // origin:'https://retrade-1.onrender.com',
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
app.use("/api/notifications",notificationRoutes)
app.use("/api/comments",commentRoutes)
app.use("/api/products",productRoutes);
app.use("/api/bids",bidsRoutes);
app.use("/api/payment",paymentRoutes)

// deployment config
// const path = require("path");
// __dirname = path.resolve();

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/build")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
//   });
// }

app.listen(PORT,()=>{
    console.log("Server Started Successfully");
})


