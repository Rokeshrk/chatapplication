"use client"
import React, { useState } from 'react';
//import { registerUser, loginUser } from '../action/api/api';
import Link from 'next/link';
import { LuRocket} from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import Lottie from 'react-lottie-player';
import AuthAnimationData from "../../asserts/animation/auth-page-animation.json";
import {signIn} from "next-auth/react";
import { client } from '../../api/client';
//import { useNavigate } from "react-router-dom"

const SignupForm: React.FC = () => {

    const [registrationData, setRegistrationData] = useState({
      username: '',
      email: '',
      password: '',
    });
  
    //const { email, username, password } = registrationData;
    const onChangeRegister=(e:any) =>{
          setRegistrationData({...registrationData,[e.target.name]:e.target.value});
    }
  
    const handleRegistration = async () => {
      try {
        await registerUser(registrationData);
        alert('Registration successful!');
      } catch (error) {
        alert(error.message);
      }
    };
    //const navigate = useNavigate();
    interface registrationData{
        username: string;
        email: string;
        password: string;
    }
   async function registerUser(registrationData: registrationData){
      const result = await client.signup.signup({body:registrationData})

    if(result.status === 200){
          console.log(result);
    }
    else{
      console.log(result);
    }

    }
  
    
  return (
    <section className="min-h-screen grid grid-cols-1 sm:grid-cols-2">
      <div className="login-form relative flex items-center justify-center bg-white rounded-lg p-2 space-y-6">
        <span className="flex flex-col space-y-3">
        <h1 className=" text-slate-950 font-extrabold italic flex gap-2">Let&apos;s Started <LuRocket/></h1>
        <label className=" text-zinc-900 opacity-30 flex flex-col space-y-4">Create an Account</label>

          <div className="input-group flex flex-col space-y-3">
              <input
                type="text"
                name="username"
                placeholder="Enter your Name"
                value={registrationData.username}
                onChange={onChangeRegister}
                className="h-10 border border-gray-300 rounded px-3 focus:outline-none focus:border-blue-500"
              />
          </div>

          <div className="input-group flex flex-col space-y-3">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={registrationData.email}
              onChange={onChangeRegister}
              className="h-10 border border-gray-300 rounded px-3 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="input-group flex flex-col space-y-3">
          <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              value={registrationData.password}
                onChange={onChangeRegister}
              className="h-10 border border-gray-300 rounded px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <div className="signin-group flex items-center justify-center space-x-10 bg-blue-500 text-white hover:bg-blue-600 transition duration-300 ease-in-out h-10 px-40 rounded cursor-pointer">
            {/* <input
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-600 transition duration-300 ease-in-out h-10 px-40 rounded cursor-pointer"
              id="Signup"
              value="Sign Up"
            /> */}
            <Link href="/display">
            <button onClick={handleRegistration}>Register</button> </Link>
            <span className="res hidden text-center text-green-500">Logged in successfully</span>
          </div>

          <div className="flex border border-gray-300 rounded p-2 cursor-pointer">
            <div className="google relative w-10">
                <FcGoogle/>
            </div>
            <div className="google-txt text-slate-950 flex items-left justify-left">
                <button onClick={()=>signIn("google")}>Signup with google</button></div>
          </div>

          <div className="signup-group flex items-center justify-center">
            <span className="text-slate-950">Already have an account? 
              <Link href="/loginform" className="text-blue-500">Login</Link>
            </span>
          </div>

        </span>
      </div>

      <div className="side-logo relative flex items-center justify-center">
        <Lottie
        play
        loop
        animationData={AuthAnimationData}
        className="w-full h-full"
        />
      </div>

    </section>
  );
};

export default SignupForm;