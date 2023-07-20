import { ApiService } from '@/services/ApiService';  
import { config } from '@/services/config';
import { NextResponse } from 'next/server';

//Auth token API
export async function GET(request) {
    
    
    const res = await fetch(ApiService.buildURL(ApiService.TOKEN_API), {
        method: "POST",
        next: { revalidate: 0 }, // revalidate api on each request
        headers: {
            "Api-key": config.API_KEY,
        },
    });
    const json =  await res.json();
    return NextResponse.json(json);
    
}
 