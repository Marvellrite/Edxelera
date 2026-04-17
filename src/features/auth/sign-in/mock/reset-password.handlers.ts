import { http, HttpResponse } from 'msw';
import env from '@/lib/config/client/env';


const proxyUrl = env.NEXT_PUBLIC_PROXY_URL

const signInHandler = [

    // Forgotten password form request
    http.post(`${proxyUrl}/auth/`, async()=>{

        // I am using a bunch of tokens here
        const [access_token, refresh_token] = [ 'qwq32324weedfe3232', '311111112wewewa' ]

        const response = HttpResponse.json({
                success: true,
                message: "Login Successful",
                data: {
                    access_token,
                    refresh_token
                }
            })
        return response
    }),

]


export default signInHandler;