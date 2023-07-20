'use client'
  
import { AuthService } from '@/services/AuthService'; 
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export default function Login() {
    
    const [error,setError] =useState(false);
    const router = useRouter();

    useEffect(()=>{

        if(AuthService.check(Cookies.get("token")))
        {
            router.push("/home")
        }
    },[])
  
    async function  authorize() {
   
       let response = await AuthService.authorizeToken();
       if(response){
            router.push("/home")
       }
       else{
        setError("Unable to authorize")
       }
    }
  
    return (
      <>    
            {error && <span>Unable to authorized</span>}
            <button onClick={(e)=>authorize()}>Authorize</button>
      </>
    );
  }