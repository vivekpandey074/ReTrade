import axiosInstance from "./axiosInstance";

//add a notification

export const AddNotification=async (data)=>{
  try{
    const response=await axiosInstance.post("/api/notifications/notify",data);
    return response.data;
  }catch(err){
    return err.data;
  }

}

export const GetAllNotification=async()=>{
    try{
     const response=await axiosInstance.get("/api/notifications/get-all-notifications");
     return response.data;

    }catch(err){
        return err.response.data

    }
}

//not using for now
export const DeleteNotification=async(id)=>{
    try{
        const response=await axiosInstance.delete(`/api/notifications/delete-notification/${id}`)
        return response.data;

    }catch(err){
      return err.response.data;
    }
}


export const ReadAllNotifications=async ()=>{
    try{
        const response=await axiosInstance.put("/api/notifications/read-all-notifications");
        return response.data;

    }catch(err){
        return err.response.data;
    }
}