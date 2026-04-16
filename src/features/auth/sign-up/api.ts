import { WEB_CLIENT_HEADER } from '@/constants';
import { SignUpSchema } from './types';
import env from '@/lib/config/env'
import { AuthResponse } from '../types';

// Auth API Functions
export const signUpAPI = {
  signUp: async (data: Omit<SignUpSchema, "confirm_password">) => {
    const response = await fetch(`${env.NEXT_PUBLIC_PROXY_URL}/auth/sign-up`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        ...WEB_CLIENT_HEADER,
      },
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Sign up failed");
    }

    return response.json() as Promise<AuthResponse>;
  },


  
};