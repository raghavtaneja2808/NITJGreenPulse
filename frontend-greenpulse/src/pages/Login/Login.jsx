import React, {useState, useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import axios from "axios";

import "../../assets/external-css/login.css"


const Login = () => {


      const [passwordShown, setPasswordShown] = useState(false);
      const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);

        const navigate = useNavigate();
      
        
        const handleSignUpDirect =(e) => {
            e.preventDefault();
            navigate('/signup');
        }

  const handleSubmit = async(e) => {
    e.preventDefault();
  
    const userData = {
      email:document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    console.log(userData)
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/login`, userData,{ withCredentials: true });
      console.log("Response:", response.data);
      if(response.data.message==true){
      navigate("/home")}
      else{alert(response.data.message)}
    } catch (error) {
      console.error("Error signing up:", error.response?.data || error);
    }

  };




  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ||
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  
    const handleChange = (e) => {
      setIsDarkMode(e.matches);
      localStorage.setItem("theme", e.matches ? "dark" : "light");
    };
  
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);



    return (



<section className="grid text-center min-w-full h-screen items-center p-8 bg-whiteGray w-full dark:bg-black">
      <div className="second-div-login bg-transparent rounded-lg p-8 w-4/5 mx-auto shadow-sm border bg-white border-gray-100 py-20 dark:bg-black dark:text-white">
        <h3 className="text-2xl font-bold text-blue-gray-800 mb-2 dark:bg-black dark:text-white">Log In</h3>
        <p className="text-gray-600 text-lg mb-6 dark:bg-black dark:text-white">
          Enter your email and password to Log in
        </p>

        <form onSubmit={handleSubmit} className="mx-auto max-w-md text-left dark:bg-black dark:text-white">
          {/* Email Input */}
          <div className="mb-4 dark:bg-black dark:text-white">
            <label htmlFor="email" className="block font-medium text-gray-900 mb-1 dark:bg-black dark:text-white">
              Your Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="name@mail.com"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-darkGray outline-none dark:bg-black dark:text-white"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4 relative m-auto dark:bg-black dark:text-white">
            <label htmlFor="password" className="block font-medium text-gray-900 mb-1 dark:bg-black dark:text-white">
              Password
            </label>
            <input
              id="password"
              type={passwordShown ? "text" : "password"}
              placeholder="********"
              className="w-full border border-gray-300  rounded-md p-2 pr-10 focus:ring-1 focus:ring-darkGray outline-none dark:bg-black dark:text-white"
            />
            <button
              type="button"
              className="absolute inset-y-12 right-3 flex items-center text-gray-500 dark:bg-black dark:text-white"
              onClick={togglePasswordVisibility}
            >
              {passwordShown ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
            </button>
          </div>

          {/* Sign In Button */}
          <button className="border border-gray bg-darkGray text-black font-semibold px-4 py-2 rounded-lg w-full mt-4 hover:shadow-lg transition dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black duration-200 ease-linear">
            Log in
          </button>
          {/* Forgot Password */}
          <div className="mt-3 text-right">
            <Link to="#" className="text-darkGray text-sm dark:bg-black dark:text-white">
              Forgot password?
            </Link>
          </div>

          {/* Google Sign In Button */}
          <button className="mt-4 flex h-12 items-center justify-center gap-2 border border-darkGray px-4 py-2 rounded-lg w-full font-semibold dark:bg-black dark:text-white dark:hover:text-black dark:hover:bg-white transition duration-200 ease-linear" onClick={() => window.location.href =`${import.meta.env.VITE_SERVER}/auth/google`}>
            <img src="https://www.material-tailwind.com/logos/logo-google.png" className="h-6 w-6" alt="Google logo" />
            Sign in with Google
          </button>

          {/* Register Link */}
          <p className="mt-4 text-center text-gray-600 dark:bg-black dark:text-white">
            Not registered?{" "}
            <Link to="#" className="font-medium text-darkGray hover:underline" onClick={handleSignUpDirect}>
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </section>
    );

};

export default Login;