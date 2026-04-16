import axios from "axios"
import env from "@/lib/env"

const apiClient = axios.create({
    baseURL: env.NEXT_PUBLIC_SERVER_URL,
    withCredentials: true
})

export default apiClient;