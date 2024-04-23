import React, { useState } from 'react'

export default function Home() {

    const [state,setState]=useState("Hellow")

async function  handleRandom(){
  
const response=await RandomRouter();
setState(response);
    
}



  return (
   <div>
   
<div><h1>{state}</h1></div>
   </div>
  )
}
