// "use client"
// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// import Link from 'next/link';
// // import { useRouter } from 'next/router';
// export default function verifyemail() {
//   //  const router = useRouter();
//   const[token , settoken] = useState("");
//   const [verified , setverified] = useState(false);
//   const[error , seterror] = useState(false);

//   const VerifyEmail = async ()=>{
//     try {
//       axios.post("/api/users/verifyemail", {token});
//       setverified(true);
//     } catch (error: any) {
//          seterror(true)
//          console.log(error.response.message);     
//     } 
//   }

//   useEffect(()=>{
//   const urltoken = window.location.search.split("=")[1];
//   settoken(urltoken || " ");
  
//     // const {query} = router;
//     // const urltoken =  query.token; //this methodused in next js 

//   })
//   useEffect(()=>{
//     if (token.length > 0) {
//       verifyemail()
//     }
//   },[token])


//   return (
//     <div className='flex flex-col items-center justify-center min-h-screen py-2'>
//        <h1 className='text-4xl'>Verify Email</h1>
//        <h1 className='text-2xl'>{token ? `${token}` : " no token"}</h1>
//        {verified && (
//         <div> 
//          <h1> user verified </h1> 
//         <Link href="/login">login</Link>
//         </div>
//        )}
//        {error && (
//         <div>
//           <h1>Error</h1>
//         </div>
//        )}
//     </div>
//   )
// }


"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const VerifyEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(false)
    } catch (error:any) {
      setError(true);
      console.log(error.response?.message || "Unknown error occurred");
    }
  };

  useEffect(() => {
    setError(false)
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    setError(false)
    if (token.length > 0) {
      VerifyEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h1 className="text-2xl bg-orange-700 p-3">{token ? `${token}` : "No token"}</h1>
      {verified && (
        <div>
          <h1>User Verified</h1>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h1>Error</h1>
        </div>
      )}
    </div>
  );
}
