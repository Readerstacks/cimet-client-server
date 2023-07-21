import { ApiService } from "@/services/ApiService";
import { config } from "@/services/config";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

//POST Api to get products
export async function POST(request) {
  const headersList = headers();
  const token = headersList.get("token");
  const res = await ApiService.fetch(ApiService.PLAN_LIST, {
    method: "POST",
    headers: { "Auth-token": token, "Api-key": config.API_KEY },
    body: JSON.stringify({ session_id: config.SESSION_ID }),
  });

  let resp = await res.json();
  return NextResponse.json(resp);
}
