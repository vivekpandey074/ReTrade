
import axiosInstance from "./axiosInstance";

export const AddProduct=async (payload)=>{
    try{
       const response=await axiosInstance.post("/api/products/addproduct",payload);
       return response.data;

    }catch(err){
       return err.message;
    }
}

export const GetAllProducts=async ()=>{
    try{ 
        const response=await axiosInstance.get("/api/products/getproducts");
        return response.data;

    }catch(err){
        return err.message;
    }
}


export const DeleteProduct=async(id)=>{
    try{
          const response=await axiosInstance.delete(`/api/products/delete/${id}`)
          return response.data;
    }
    catch(err){
      return err.message;
    }

}


export const updateProduct=async (product)=>{
   
    try{
         const response=await axiosInstance.put(`/api/products/update/${product._id}`,product);
         return response.data;
      }
    catch(err){
        return err.message;
    }
}

export const UploadProductImage=async (product,formData)=>{
  try{ 
 
   const response=await axiosInstance.post(
    `/api/products/upload-product-image/${product._id}`,formData,
   
   )
  
   return response.data


  }catch(err){
   return err.message
  }
}

export const ImageDelete=async(product,images)=>{
try {
   
    const response=await axiosInstance.put(
        `/api/products/deleteimage/${product._id}`,
        images
    )

    return response.data;
} catch (err) {
    return err.message
}
}