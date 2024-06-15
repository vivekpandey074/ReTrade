# RETRADE: MARKETPLACE FOR REFURBHISHED ITEMS.
## 🍐: Features
1. Authentication
2. Separate Admin Panel: admin can block/unblock user and apporove or reject product.
3. Add Product/Update Product (along with images).
4. Product Biding (add bids on particular product).
5. Payment Integration.

## :blueberries: Tech Stack: React, Tailwindcss, Nodejs, Redux, Mongodb.

# Project Setup 
1.     $ git clone https://github.com/vivekpandey074/ReTrade.git
   
2. Client-side usage(PORT: 5173)
   
       $ cd client          // go to client folder
       $ yarn # or npm i    // npm install packages
       $ npm run dev        // run it locally

       // deployment for client app
       $ npm run build // this will compile the react code using webpack and generate a folder called docs in the root level

3. Server-side usage (PORT: 5000)

       $ cd server   // go to server folder
       $ npm i       // npm install packages
       $ npm run dev // run it locally
       $ npm run build // production: this will build the server code to es5 js codes and generate a dist file
       $ npm start //production: start command

4. .env Key-value pairs for server side.
   
       PORT=5000
       MONGO_DB_URL=YOUR MONGODB URL
       TOKEN_SECRET= JWT TOKEN SECRET
       CLOUD_NAME=CLOUD_NAME_FOR_CLOUDINARY
       CLOUD_API_KEY=YOUR_API_KEY_CLOUDINARY
       CLOUD_API_SECRETYOUR_API_SECRET_CLOUDINARY
       RAZORPAY_API_KEY=YOUR_RAZORPAY_API_KEY
       RAZORPAY_API_SECRET=YOUR_RAZORPAY_API_SECRET

## 🍍: VIDEO / SCREENSHOTS

1.PRODUCT BIDING

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/ljUbj7ZWZz0/0.jpg)](https://www.youtube.com/watch?v=ljUbj7ZWZz0)



2.LOGIN/ HOME PAGE

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/EhpOQQC1RDI/0.jpg)](https://www.youtube.com/watch?v=EhpOQQC1RDI)


3.PRODUCT PAGE

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/Un7ENGUqSUA/0.jpg)](https://www.youtube.com/watch?v=Un7ENGUqSUA)


