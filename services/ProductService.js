import { config } from "./config";
const { ApiService } = require("./ApiService");
const { AuthService } = require("./AuthService");

export class ProductService {
  
  static PLAN_API = "products";

  static async getList() {
    let token = await AuthService.getToken();
    const res = await fetch(config.LOCAL_API_URL+ProductService.PLAN_API, {
      method: "POST",
      headers: { "token": token },
      body: JSON.stringify({ session_id: config.SESSION_ID }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    return res.json();
  }
 
}