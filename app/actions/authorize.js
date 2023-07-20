'use server'

import { AuthService } from "@/services/AuthService";
import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers"

 
export async function authorize() {
    const token = cookies().get("token");

    if(AuthService.check(token)){ // Token valid then redirect to home otherwise request for one
        
        return redirect("/home")
    }
    else{
        if(await AuthService.authorizeToken()){
            redirect("/home")
        }
        else{
            return new Response('Unable to authenticate you', {
                status: 401,
            })
        }
    }

  
}