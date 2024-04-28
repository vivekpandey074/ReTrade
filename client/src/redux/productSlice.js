import {createSlice} from "@reduxjs/toolkit";

export const productSlice=createSlice({
    name:"products",
    initialState:{
        products:[],
    },
    reducers:{
        SetProducts:(state,action)=>{
         state.products=action.payload;
        },
    }
})

export const {SetProducts}=productSlice.actions;