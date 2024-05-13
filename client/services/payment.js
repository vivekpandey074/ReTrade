import axiosInstance from "./axiosInstance";


export const CheckoutHandler=async(amount,user,product)=>{
    try{
       
        const {data:{key}}=await axiosInstance.get("/api/payment/get-key")

        const response=await axiosInstance.post("/api/payment/checkout",{
            amount
        })
      
         
     
        const options = {
            key: key, // Enter the Key ID generated from the Dashboard
            amount: response.data.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "ReTrade", //your business name
            description: "ReTrade Transaction",
            image: "",
            order_id: response.data.data.id, 
            callback_url: `http://localhost:5000/api/payment/payment-verification/${product}`,
            prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                name: user.firstname+" "+user.lastname, //your customer's name
                email: user.email,
                contact: "1234567891" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }; 
        const razor = new window.Razorpay(options);  //script tag that we added intially put Razorpay in window object
        razor.open();
        
        return {success:true}
     

    }catch(err){
        return err
    }
}


export const GetProductSoldOut=async (product)=>{
    try {
        const response=await axiosInstance.post("/api/payment/Check-Soldout",product)
        return response.data;
    } catch (err) {
        return err;
        
    }

}