
import { ApiService } from "./ApiService";
import { redirect } from 'next/navigation'
import Cookies from 'js-cookie';
const { config } = require("./config");

export class AuthService {

    static TOKEN_API = "auth";

    //get auth token 
    static async getToken() {

        if (!AuthService.check(Cookies.get("token"))) {
            let response = await AuthService.authorizeToken();
            if (!response) {
                throw new Error("Unable to authorized")
            }
        }
        let tokenPayload = Cookies.get("token");
        let parseToken = JSON.parse(tokenPayload);
        return parseToken.token

    }

    //save token in cookies
    static saveToken(token) {
        let payload = JSON.stringify({ token: token.token, time: token.token_expire_time })
        Cookies.set("token", payload, { secure: true });
        return true
    }
 

    static async authorizeToken() {

        const res = await fetch(config.LOCAL_API_URL+AuthService.TOKEN_API, {
            method: "GET",
            next: { revalidate: 0 }, // revalidate api on each request
        });

        if (!res.ok) {
            return false;
        }
        let response = await res.json();
        if (response.status == 1) {
            AuthService.saveToken(response.data);
            return true
        }
        else {
            return false;
        }
    }

    // check if token is expired
    static check(token) {
       
        var date = new Date();
        if (token) {
            let tokenPayload = token;
            let parseToken = JSON.parse(tokenPayload);
         
            let expiry = parseToken.time.split(/[- :]/); // to parse server date to js date, split using  - and :
            // Apply each element to the Date function
            let expireTime = new Date((expiry[0], expiry[1] - 1, expiry[2], expiry[3], expiry[4], expiry[5])); // convet js date object timezone UTC

            if (expireTime < date) {
                return false;
            }
            else {
                return true;
            }

        }

        return false;
    }
}