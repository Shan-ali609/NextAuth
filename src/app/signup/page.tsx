// "use client"
// import React , {useEffect , useState} from 'react'
// import axios from 'axios';
// import toast, { Toast } from 'react-hot-toast';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// export default function signuppage() {
//   const router = useRouter();
//     const [user , setUser] =   useState({
//       username : " ",
//       email : " ",
//       password : " "
//     })
//     const [disabled , setDisabled] =   useState(false);
//     const [loading , setloading] =   useState(false);
//      const onsignup = async ()=>{
//       try {
//         setloading(true);
//       const response = await axios.post("/api/users/singup", user);
//         console.log("singnup successfully", response.data)
//         router.push('/login');
//       } catch (error: any) {
//         console.log(error.message)
//         toast.error(error.message)
//       }
//      }

//      useEffect(()=>{
//       if (user.email.length > 0 && user.username.length > 0 && user.password.length > 0) {
//         setDisabled(false)
//       }else{
//         setDisabled(true)
//       }
//      },[user])
//   return (
//     <div className='flex flex-col items-center justify-center w-full h-screen'>
//       <p className='text-2xl flex justify-center items-center'>{loading ? " process.." : "Signup "}</p>
//        <hr />
//        <hr />
//        <label htmlFor="username" className='flex justify-start items-start text-[16px]'>Username</label>
//        <input 
//        className='border-2 border-black'
//          type="text"
//          name="username" id="user"
//          placeholder='Username..'
//          value={user.username}
//         onChange={(e)=>setUser({...user, username: e.target.value })}
//         />

//   <label htmlFor="username" className='flex justify-start items-start text-[16px]'>Email</label>
//        <input 
//        className='border-2 border-black'
//          type="email"
//          name="email" id="email"
//          placeholder='one@gmail.com'
//          value={user.email}
//         onChange={(e)=>setUser({...user, email: e.target.value })}
//         />

//   <label htmlFor="username" className='flex justify-start items-start text-[16px]'>Password</label>
//        <input 
//        className='border-2 border-black'
//          type="text"
//          name="password" id="password"
//          placeholder='password'
//          value={user.password}
//         onChange={(e)=>setUser({...user, password: e.target.value })}
//         />
//      <button
//       onClick={onsignup}  className=' bg-blue-400 px-3 mt-5'  >
//       { disabled ? "No signup" : "Sigup "}</button>
//       <Link href="/login" >visit login page</Link>
//     </div>
//   )
// }



"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onsignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user); // Fix route typo
      console.log("Signup successful", response.data);
      toast.success("Signup successful!");
      router.push("/login");
    } catch (error: any) {
      console.log(error.response?.data?.error || error.message);
      toast.error(error.response?.data?.error || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isFormValid =
      user.email.trim() && user.username.trim() && user.password.trim();
    setDisabled(!isFormValid);
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <p className="text-2xl flex justify-center items-center">
        {loading ? "Processing..." : "Signup"}
      </p>
      <hr />
      <label htmlFor="username" className="text-[16px]">
        Username
      </label>
      <input
        className="border-2 border-black"
        type="text"
        placeholder="Username.."
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />

      <label htmlFor="email" className="text-[16px]">
        Email
      </label>
      <input
        className="border-2 border-black"
        type="email"
        placeholder="one@gmail.com"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <label htmlFor="password" className="text-[16px]">
        Password
      </label>
      <input
        className="border-2 border-black"
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button
        onClick={onsignup}
        className="bg-blue-400 px-3 mt-5"
        disabled={disabled || loading}
      >
        {loading ? "Processing..." : disabled ? "No Signup" : "Signup"}
      </button>
      <Link href="/login">Visit login page</Link>
    </div>
  );
}
