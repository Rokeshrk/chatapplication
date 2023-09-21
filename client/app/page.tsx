"use client"
import React from 'react'
import LoginForm from './loginform/page'
import { button } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
//import useLocalStorage from '../hooks/useLocalStorage';

const page = () => {
  return (
    <LoginForm/>
    // <SignupForm/>
    // <Navbar/>
    // <button onClick={()=> signIn("google")}>
    //   signIn
    // </button>
  )
}

export default page;