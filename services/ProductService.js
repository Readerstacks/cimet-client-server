import { config } from "./config";
const { ApiService } = require("./ApiService");
const { AuthService } = require("./AuthService");

export class ProductService{


    static async getList() {
        let token = await AuthService.getToken();  
      
        const res = await ApiService.fetch(ApiService.PLAN_LIST, {
          method: "POST",
          headers:{ "Auth-token": token},
          body: JSON.stringify({ session_id: config.SESSION_ID }),
        });
      
        if (!res.ok) {
          if(res.status==401){
           AuthService.invalidateToken(); // or redirect user for login 
          } 
          throw new Error("Failed to fetch products");
        }
        return res.json();
      
    }
}