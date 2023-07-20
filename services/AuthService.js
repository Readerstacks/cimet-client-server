import { cookies } from "next/dist/client/components/headers";
import { ApiService } from "./ApiService";
import { redirect } from 'next/navigation'
const { config } = require("./config");

export class AuthService {

    //get auth token otherwise return to login for opt a new one
    static async getToken() {

        if (!AuthService.check(cookies().get("token"))) {
            redirect("/");
        }
        else {
            let tokenPayload = cookies().get("token").value;
            let parseToken = JSON.parse(tokenPayload);
            return parseToken.token
        }
    }
  
  // check if token is expired
    static check(token) {
        var date = new Date();
        if (token) {
            let tokenPayload = token.value;
            let parseToken = JSON.parse(tokenPayload);
            let t = parseToken.time.split(/[- :]/); // to parse server date to js date, split using  - and :
            // Apply each element to the Date function
            let expireTime = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5])); // convet js date object timezone UTC
            
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