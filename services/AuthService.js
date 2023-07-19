import { cookies } from "next/dist/client/components/headers";
import { ApiService } from "./ApiService";
import { redirect } from 'next/navigation'
const { config } = require("./config");

export class AuthService{
    static token={token:"",time:0};

    static async getToken() {
    
        if(!AuthService.check(cookies().get("token"))){
              redirect("/");
        }
        else{
            let tokenPayload   = cookies().get("token").value;
            let parseToken     = JSON.parse(tokenPayload);
            return parseToken.token
        }
    }
   

    static check(token){ // check if token is expired
        var date= new Date();
        if(token){
            let tokenPayload    = token.value;
            let parseToken     = JSON.parse(tokenPayload);
            let t = parseToken.time.split(/[- :]/);
             // Apply each element to the Date function
             let expireTime = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
            if(expireTime < date )
            {
                return false;
            }
            else{
                return true;
            }
    
        }
        
        return false;
    } 
}