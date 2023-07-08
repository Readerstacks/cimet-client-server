const { config } = require("./config");

export class ApiService {
  static TOKEN_API = "generate-token";

  static PLAN_LIST = "plan-list";

  static buildURL(url) {
    return config.API_URL + config.DS + config.VERSION + config.DS + url;
  }

  static async getToken() {
    const res = await fetch(ApiService.buildURL(ApiService.TOKEN_API), {
      method: "POST",
      next: { revalidate: config.TOKEN_REVALIDATE_TIME },
      headers: {
        "Api-key": config.API_KEY,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch token from api server");
    }

    return ApiService.parseTokenFromResponse(await res.json());
  }

  static async parseTokenFromResponse(response) {
    if (response.status == 1) {
      return response.data.token;
    } else {
      return false;
    }
  }

  static async getProducts() {
    let token = await ApiService.getToken();

    if (token) {
      const res = await fetch(ApiService.buildURL(ApiService.PLAN_LIST), {
        method: "POST",
        next: { revalidate: config.API_CACHING_TIME },
        headers: {
          "Api-key": config.API_KEY,
          "Auth-token": token,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_id: config.SESSION_ID }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      return res.json();
    } else {
      throw new Error("Unable to authnticate you");
    }
  }
}
