import { http, HttpResponse } from 'msw';
import env from '@/lib/config/client/env';


const proxyUrl = env.NEXT_PUBLIC_PROXY_URL

const resetPasswordHandlers = [

    // Forgotten password form request
    http.post(`${proxyUrl}/auth/forgotten-password`, async()=>{

        const response = HttpResponse.json({
            success: true,
            message: "An OTP has been sent to your email",
        })
        return response
    }),

    // Verify OTP form
    http.post(`${proxyUrl}/auth/verify-otp`, async()=>{

        return HttpResponse.json({
            success: true,
            message: "OTP Verified",
        }, {
            status: 200,
           headers: {
                    'Set-Cookie': 'reset_token=ereds3243433',
                    }
        })
    }),


    // Reset Password Form

    http.post(`${proxyUrl}/auth/reset-password`, async()=>{
        
        return HttpResponse.json(
            {
                message: "Password updated successfully"
            },
            {
                status: 200,
            }
        )
    })
]


export default resetPasswordHandlers;