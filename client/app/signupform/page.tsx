"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { LuRocket} from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import Lottie from 'react-lottie-player';
import AuthAnimationData from "../../asserts/animation/auth-page-animation.json";
import {signIn} from "next-auth/react";
import { client } from '../../api/client';
//import { useNavigate } from "react-router-dom"

interface registrationData{
  username: string;
  email: string;
  password: string;
  profilePicture: string;
}

const SignupForm: React.FC = () => {

    const [registrationData, setRegistrationData] = useState({
      username: '',
      email: '',
      password: '',
      profilePicture: '',
    });
  
    //const { email, username, password } = registrationData;
    const onChangeRegister=(e:any) =>{
          setRegistrationData({...registrationData,[e.target.name]:e.target.value});
    }
    console.log(registrationData)
  
    //const navigate = useNavigate();
    
   async function registerUser(registrationData: registrationData){
      const result = await client.signup.signup({body:registrationData})
      console.log(result);

      if(result.status === 200){
            console.log(result);
      }
      else{
        console.log(result);
      }
    }
  
    const handleRegistration = async () => {
      if(registrationData!==null){
        console.log('Successfully registered')
      }
      try {
        await registerUser(registrationData);
        alert('Registration successful!');
      } catch (error) {
        alert(error.message);
      }
    };

    // const handleGroupPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //   const file = e.target.files?.[0] || null;
    //   setGroupPhoto(file);
    // };
    
  return (
    <section className="min-h-screen grid grid-cols-1 sm:grid-cols-2">
      <div className="relative flex items-center justify-center bg-white rounded-lg p-2 space-y-6">
        <form onSubmit={handleRegistration}>
        <span className="flex flex-col space-y-3">
        <h1 className=" text-slate-950 font-extrabold italic flex gap-2">Let&apos;s Started <LuRocket/></h1>
        <label className=" text-zinc-900 opacity-30 flex flex-col space-y-4">Create an Account</label>

          <div className="flex flex-col space-y-3">
              <input
                type="text"
                name="username"
                placeholder="Enter your Name"
                value={registrationData.username}
                onChange={onChangeRegister}
                className="h-10 border border-gray-300 rounded px-3 focus:outline-none focus:border-blue-500"
                required
              />
          </div>

          <div className="flex flex-col space-y-3">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={registrationData.email}
              onChange={onChangeRegister}
              className="h-10 border border-gray-300 rounded px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="flex flex-col space-y-3">
          <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              value={registrationData.password}
              onChange={onChangeRegister}
              className="h-10 border border-gray-300 rounded px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          {/* Group Photo */}
          <div className="mb-6">
            <input
            type="file"
            placeholder='Add Profile Picture'
            value={registrationData.profilePicture}
            onChange={onChangeRegister}
            className="border p-2 w-full"
            />
          </div>
          
          <div className="flex items-center justify-center space-x-10 bg-blue-500 text-white hover:bg-blue-600 transition duration-300 ease-in-out h-10 px-40 rounded cursor-pointer">
            <Link href="/dashboard">
              <button type='submit'>Register</button>
            </Link>
            <span className="res hidden text-center text-green-500">Logged in successfully</span>
          </div>

          <div className="google-signin-group flex gap-4 border border-gray-300 rounded p-1 cursor-pointer hover:bg-green-500">
            <div className="p-2 pl-20 relative w-10">
                <FcGoogle/>
            </div>
            <div>
              <span className="text-slate-950 p-1 flex items-left justify-left">
                <button onClick={()=>signIn("google")}>
                  Sign in with Google
                </button>
              </span>
            </div>
          </div>

          <div className="flex gap-2 items-center justify-center">
            <span className="text-slate-950">Already have an account?</span>
              <Link href="/loginform" className="text-blue-500">Login</Link>
          </div>

        </span>
        </form>
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