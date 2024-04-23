import axios from "axios";
import axiosInstance  from "./axiosInstance";



//register user
export const RegisterUser=async (payload)=>{
    try{

     const response=await axiosInstance.post("/api/users/register",{
      firstname:payload.firstname,
      lastname:payload.lastname,
      email:payload.email,
      password:payload.password
     });
     return response.data;
    }
    catch{
     return error.message;
    }
}


//login user
export const LoginUser=async (payload)=>{
    try{
     
    const response=await axiosInstance.post("/api/users/login",{
      email:payload.email,
      password:payload.password
    });
    return response.data;
    }
    catch(error){
      return error.message;
    }
}


//getcurrentuser



export const GetCurrentUser=async ()=>{
  try{ 
    
    
    const response=await axiosInstance.get("/api/users/getcurrentuser")
   
    return response.data;
    

  }catch(err){
  
   return err.message;
  }
} 


//

export const RandomRouter=async()=>{
  try{
    
    const response=await axiosInstance.get('/api/users/random')
  // const response=await axios({
  //   method:'get',
  //   url:'/api/users/random',
  //   headers: {
  //      'Authorization': 'Bearer ksdjfglksgflksgsjdhglaslfkhgasf' }
  // })
 
    return response.data();
   
  }
  catch(err){
    console.log(err);
  }
}