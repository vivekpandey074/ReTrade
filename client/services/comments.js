import axiosInstance from "./axiosInstance";


export const PlaceComment=async (comment)=>{
try {
    const response=await axiosInstance.post("/api/comments/placecomment",comment)
    return response.data;
} catch (err) {
    return err
    
}
}
export const GetAllComments=async (filter)=>{
try {
    const response=await axiosInstance.post("/api/comments/get-all-comments",filter)
    return response.data
} catch (err) {
    return err
}
}