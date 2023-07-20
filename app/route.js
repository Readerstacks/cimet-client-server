import { ApiService } from '@/services/ApiService'; 
import { AuthService } from '@/services/AuthService';
import { config } from '@/services/config';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
 
// start application with initial request for token and assign it to client browser 
export async function GET(request) {
    const token = request.cookies.get('token')
    
    if(AuthService.check(token)){ // Token valid then redirect to home otherwise request for one
        
        return redirect("/home")
    }
    else{
        if(await authorizeToken()){
            redirect("/home")
        }
        else{
            return new Response('Unable to authenticate you', {
                status: 401,
            })
        }
}

//Get Token from Remote Server And Update to Cookies
async function authorizeToken(){
    const res = await fetch(ApiService.buildURL(ApiService.TOKEN_API), {
        method: "POST",
        next: { revalidate: 0}, // revalidate api on each request
        headers: {
            "Api-key": config.API_KEY,
        },
        });

        if (!res.ok) {
            return false;
        }
        let response= await res.json(); 
        if (response.status == 1) {
            cookies().set("token",JSON.stringify({token:response.data.token,time:response.data.token_expire_time}),{secure:true});
            return true
        }
        else{
            return false;
        }
    }
}