import { config } from "./config";
const { ApiService } = require("./ApiService");
const { AuthService } = require("./AuthService");

export class ProductService {
  static PLAN_API = "products";

  static async getList() {
    const token = await AuthService.getToken();
    const res = await fetch(config.LOCAL_API_URL + ProductService.PLAN_API, {
      method: "POST",
      headers: { token: token },
    });
    const json = await res.json();
    return json;
  }
}
