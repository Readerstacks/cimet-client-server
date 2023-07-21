import { config } from "./config";
import { Util } from "./Util";
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

  static addFilter(products) {
    let filteredProducts = {};

    for (let product of products) {
      if (!filteredProducts[product.billing_options]) {
        filteredProducts[product.billing_options] = product;
      } else {
        if (
          filteredProducts[product.billing_options]
            .expected_annually_bill_amount >
          product.expected_annually_bill_amount
        ) {
          filteredProducts[product.billing_options] = product;
        }
      }
    }
    console.log(filteredProducts, "filteredProducts");
    return Object.values(filteredProducts);
  }
}
