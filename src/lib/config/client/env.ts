import {z} from 'zod';

const envSchema = z.object({
    NEXT_PUBLIC_BACKEND_URL: z.string().url(),
    NEXT_PUBLIC_SERVER_URL: z.string().url(),
    NEXT_PUBLIC_PROXY_URL: z.string(),
    NEXT_PUBLIC_NODE_ENV: z.enum(['development', 'production'])
})

const env = envSchema.parse({ 
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_PROXY_URL: process.env.NEXT_PUBLIC_PROXY_URL,
    NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
})

export default env
