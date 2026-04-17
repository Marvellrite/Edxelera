import { successMockMeResponse } from './mockdata';
import { http, HttpResponse } from 'msw';
import env from '@/lib/config/client/env';


const proxyUrl = env.NEXT_PUBLIC_PROXY_URL

const meHandlers = [

    // Forgotten password form request
    http.post(`${proxyUrl}/auth/me`, async()=>{

        const response = HttpResponse.json(successMockMeResponse)
        return response
    }),


]


export default meHandlers;