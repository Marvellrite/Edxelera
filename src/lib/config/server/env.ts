import {z} from 'zod';

const envSchema = z.object({
    CLOUDINARY_CLOUD_NAME: z.string(),
    CLOUDINARY_API_KEY: z.string(),
    CLOUDINARY_API_SECRET: z.string(),
    NEXT_PUBLIC_BACKEND_URL: z.string().url(),
    NEXT_PUBLIC_PROXY_URL: z.string().url(),
})

if(typeof window!== undefined) {
         console.log('env in component =>', process.env)
}
else {

    console.log('process.env in server =>', process.env)
}

const env = envSchema.parse(process.env)

export default env