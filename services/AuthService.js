import { ApiService } from "./ApiService";
const { config } = require("./config");

export class AuthService{
    static token={token:"",time:0};

    static async getToken() {
        if(!AuthService.checkToken()){

           const res = await fetch(ApiService.buildURL(ApiService.TOKEN_API), {
            method: "POST",
            next: { revalidate: 0}, // revalidate api on each request
            headers: {
                "Api-key": config.API_KEY,
            },
            });

            if (!res.ok) {
                throw new Error("Failed to fetch token from api server"); 
            }
        
            let token  = AuthService.parseTokenFromResponse(await res.json()); //parse token from response and return token string
            if(token){
                AuthService.saveToken(token);  
                return token;
            }
            throw new Error("Failed to fetch token from api server"); 
        }
        else{
            
            return AuthService.token.token
        }
    }
    //parse token form response
    static async parseTokenFromResponse(response) {
        if (response.status == 1) {
            return response.data.token;
        }  
        return "";
        
    }

    static checkToken(){ // check if token is expired
        var date= new Date();
        if(AuthService.token.time<date || !AuthService.token.token){  
            return false
        }
        return true;
    }

    static saveToken(token){ // save token so we can fetch untill its not expired
        var today = new Date();
        today.setTime(today.getTime() + config.TOKEN_REVALIDATE_TIME); // 2 hours of expiry time 
        AuthService.token={token,time:today};
    }

    //invalidate the token manually
    static invalidateToken(){
        AuthService.token={token:"",time:0};
    }
}