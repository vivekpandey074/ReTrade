import React, { useEffect, useState } from "react";

import mainimg from "../../assets/mainimg2.png";
import { Link, useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { LoginUser } from "../../../services/users";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loaderSlice";

const initalState = {
  email: "",
  password: "",
};

export default function Login() {
  const [state, setState] = useState(initalState);
  const [focused, setFocus] = useState(false);
  const { email, password } = state;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      dispatch(SetLoader(true));
      const response = await LoginUser(state);
      dispatch(SetLoader(false));
      if (response.success) {
        toast.success(`User login successfully.`);
        localStorage.setItem("token", response.token);
        window.location.href = "/";
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      dispatch(SetLoader(false));
      return toast.error(`${err}`, {
        position: "top-right",
      });
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="py-16 my-auto">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div
            className="hidden lg:block lg:w-1/2 bg-cover"
            style={{
              backgroundImage: `url(${mainimg})`,
              backgroundPosition: "center",
            }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">
              RETRADE
            </h2>
            <p className="text-xl text-gray-600 text-center">Welcome back!</p>

            <form method="POST" action="/login" onSubmit={handleLogin}>
              <div className="mt-4 flex items-center justify-between ">
                <span className="border-b w-1/5 lg:w-1/4"></span>
                <a className="text-xs text-center text-gray-500 uppercase">
                  or login with email
                </a>
                <span className="border-b w-1/5 lg:w-1/4"></span>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email Address
                </label>
                <input
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                  autoComplete="off"
                  value={email}
                  onChange={handleChange}
                  onBlur={() => setFocus(true)}
                  focused={focused.toString()}
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border  inputField  border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="email"
                />
                <span className="error-msg">
                  *Email is either empty or invalid
                </span>
              </div>
              <div className="mt-4">
                <div className="flex justify-between">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Password
                  </label>
                  {/* <a href="#" className="text-xs text-gray-500">Forget Password?</a> */}
                </div>
                <input
                  name="password"
                  id="password"
                  required
                  pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
                  autoComplete="off"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                  onBlur={() => setFocus(true)}
                  focused={focused.toString()}
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border  inputField  border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="password"
                />
                <span className="error-msg">
                  *Password should be 8-20 characters and include at least 1
                  letter,1 number and 1 special character!
                </span>
              </div>
              <div className="mt-8">
                <button className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
                  Login
                </button>
              </div>
            </form>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
              <Link to="/signup" className="text-xs text-gray-500 uppercase">
                or sign up
              </Link>
              <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
