const { config } = require("./config");

export class ApiService {
   static TOKEN_API = "generate-token";
   static TOKEN_API = "generate-token";
   static PLAN_LIST = "plan-list";

   static buildURL(url) {
         return config.API_URL + config.DS + config.VERSION + config.DS + url;
   }
 
   //inherit inbuild fetch so we can globally add api key content type etc.
   static async fetch(url,payload={}){
     
      payload.headers= {
         "Api-key": config.API_KEY,
         "Accept": "application/json, text/plain, */*",
         "Content-Type": "application/json",...payload.headers
       }
      payload.next= {revalidate: config.API_CACHING_TIME,...payload.next };
      let res= await fetch(ApiService.buildURL(url),payload);
      return res;
   }

}
