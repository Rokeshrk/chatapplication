"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { LuRocket} from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import Lottie from 'react-lottie-player';
import AuthAnimationData from "../../asserts/animation/auth-page-animation.json";
//import { loginUser } from '../action/api/api';
import {client} from "../../api/client"

interface loginData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    try {
      const token = await loginUser(loginData);
      if (token) {
        // Save the token in local storage
        localStorage.setItem('authToken', token);
        alert('Login successful! Token: ' + token);
        console.log(token);
      } else {
        alert('Login failed. No token received.');
      }
    } catch (error) {
      alert(error.message);
    }
  };
  
  
  async function loginUser(loginData: loginData){
    const result = await client.login.login({body: loginData})
    console.log(result);
    if(result.status === 200){
      // UseLocalStorage(result.body.token);
      return result.body.token;
    }
    else{
      console.log("Login failed");
    }
  }

  return (
    <section className="min-h-screen grid grid-cols-1 sm:grid-cols-2">

      <div className="side-logo relative flex items-center justify-center">
        <Lottie
        play
        loop
        animationData={AuthAnimationData}
        className="w-full h-full"
        />
      </div>

      <div className="login-form relative flex items-center justify-center bg-white rounded-lg p-6 space-y-6">
        <span className="flex flex-col space-y-3">
        <h1 className=" text-slate-950 font-extrabold italic flex gap-2">Let&apos;s Started 
          <LuRocket/>
        </h1>
        <label className=" text-zinc-900 opacity-30 flex flex-col space-y-4">Login your Account</label>

          <div className="input-group flex flex-col space-y-3">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              className="h-10 border border-gray-300 rounded px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="input-group flex flex-col space-y-3">
          <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              className="h-10 border border-gray-300 rounded px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="rem-group flex items-center space-x-10">
            <input type="checkbox" name="remember" id="remember" className="form-checkbox h-5 w-5 text-blue-500" />
            <label htmlFor="remember" className="text-gray-600">Remember for 30 days</label>
              <Link href="#" className="text-blue-500">Forget Password</Link>
          </div>
          <div>
            {/* <input
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-600 transition duration-300 ease-in-out h-10 px-40 rounded cursor-pointer"
              id="Signup"
              value="Sign Up"
            /> */}
            <Link href="/dashboard">
            <button onClick={handleLogin} className="signin-group flex items-center justify-center space-x-10 bg-blue-500 text-white hover:bg-blue-600 transition duration-300 ease-in-out h-10 px-40 rounded cursor-pointer">Login</button></Link>
            <span className="res hidden text-center text-green-500">Logged in successfully</span>
          </div>
          {/* <div className="signin-group flex items-center justify-center space-x-10">
            <button onClick={handleLogin}></button>
          </div> */}

          <div className="google-signin-group flex border border-gray-300 rounded p-2 cursor-pointer">
            <div className="google relative w-10">
                <FcGoogle/>
            </div>
            <div>
              <span className="google-txt text-slate-950 flex items-left justify-left">Sign in with Google</span>
            </div>
          </div>

          <div className="signup-group flex items-center justify-center">
            <span className="text-slate-950">Don&apos;t have an account?
              <Link href="/signupform" className="text-blue-500">Sign up</Link>
            </span>
          </div>

        </span>
      </div>
    </section>
  );
};

export default LoginForm;