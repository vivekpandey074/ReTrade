import React, { useEffect, useState } from 'react'

import mainimg from "../../assets/mainimg2.png";
import { Link, useNavigate } from 'react-router-dom';
import { RegisterUser } from '../../../services/users';

import "react-toastify/dist/ReactToastify.css";
import {toast } from "react-toastify";



const initalState={
   firstname:"",
   lastname:"",
   email:"",
   password:"",
   confirmPassword:"",
}


export default function Register() {
    const [state,setState]=useState(initalState);
    const [focused, setFocus] = useState(false);
    const{firstname,lastname,email,password,confirmPassword}=state;
    const navigate=useNavigate();

    function handleChange(e){
        setState({...state,[e.target.name]:e.target.value})
     }


     

async function handleRegister(e) {
    e.preventDefault();
    
    try { 
          if(password!==confirmPassword) throw new Error("Password  and confirm password does not match");
    
        const response = await RegisterUser(state);
        if (response.success) {
           toast.success(
                `User registered successfully.`
            );

        } else {
            throw new Error(response.message)
        }

    }
    catch (err) {
     
        return toast.error(
            `${err}`
        , {
            position: "top-right",
          });
    }
    }

    useEffect(()=>{
        if(localStorage.getItem('token')){
            navigate("/")
        }
    
            },[]);



    return (
        <div className='flex flex-col justify-center h-screen'>
        <div className="py-8">
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                <div className="hidden lg:block lg:w-1/2 bg-cover"
                    style={{ backgroundImage: `url(${mainimg})`, backgroundPosition: "center" }}>
                </div>
                <div className="w-full p-8 lg:w-1/2 ">
                    <h2 className="text-2xl font-semibold text-gray-700 text-center">RETRADE</h2>
                    <p className="text-xl text-gray-600 text-center">Welcome back!</p>

                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b w-1/5 lg:w-1/4"></span>
                        <a href="#" className="text-xs text-center text-gray-500 uppercase">Register with email</a>
                        <span className="border-b w-1/5 lg:w-1/4"></span>
                    </div>
                    <form method="POST" onSubmit={handleRegister} >
                        <div className="mt-4">
                            <label
                                htmlFor="firstname"
                                className="block text-gray-700 text-sm font-bold mb-2">
                                 First Name</label>
                            <input
                                name="firstname"
                                id="firstname"
                                placeholder='firstname'
                                required
                                value={firstname}
                                onChange={handleChange}
                                autoComplete='off'
                                onBlur={() => setFocus(true)}
                                focused={focused.toString()}
                                pattern="^[A-Za-z]{3,20}$"
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline inputField border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="text" />
                            <span className="error-msg">
                                *firstname must be 3-20 characters long without any
                                space,digit or special character
                            </span>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="lastname"
                                className="block text-gray-700 text-sm font-bold mb-2">
                                Last Name</label>
                            <input
                                name="lastname"
                                id="lastname"
                                placeholder='lastname'
                                required
                                value={lastname}
                                onChange={handleChange}
                                autoComplete='off'
                                onBlur={() => setFocus(true)}
                                focused={focused.toString()}
                                pattern="^[A-Za-z]{3,20}$"
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline inputField border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="text" />
                            <span className="error-msg">
                                *lastname must be 3-20 characters long without any
                                space,digit or special character
                            </span>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-700 text-sm font-bold mb-2"
                                name="Email">Email Address</label>
                            <input
                                name="email"
                                id="email"
                                required
                                value={email}
                                onChange={handleChange}
                                placeholder='Email'
                                onBlur={() => setFocus(true)}
                                focused={focused.toString()}
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline inputField border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="email" />
                            <span className="error-msg">
                                *Email is either empty or invalid
                            </span>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-gray-700 text-sm font-bold mb-2" name="Password">Password</label>
                            <input
                                name="password"
                                id="password"
                                required
                                value={password}
                                onChange={handleChange}
                                placeholder='Password'
                                pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
                                autoComplete='off'
                                onBlur={() => setFocus(true)}
                                focused={focused.toString()}
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline inputField border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="password" />
                            <span className="error-msg">
                                *Password should be 8-20 characters and include at least 1
                                letter,1 number and 1 special character!
                            </span>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                            <input
                                name="confirmPassword"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={handleChange}
                                placeholder='Confirm Password'
                                onBlur={() => setFocus(true)}
                                focused={focused.toString()}
                                pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
                                autoComplete='off'
                                required
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline inputField  border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="password" />

                            <span className="error-msg">
                                *Password should be 8-20 characters and include at least 1
                                letter,1 number and 1 special character!
                            </span>

                        </div>
                        <div className="mt-8">
                            <button className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">Register</button>
                        </div>
                    </form>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b w-1/5 md:w-1/4"></span>
                        <Link to="/login" className="text-xs text-gray-500 uppercase">Or Login</Link>
                        <span className="border-b w-1/5 md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </div>


</div>
    )

}