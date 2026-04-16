import { WEB_CLIENT_HEADER } from "@/constants";
import { AuthResponse } from "../types";

// Auth API Functions
export const signInAPI = {


  signIn: async (data: { email: string; password: string }) => {
    // const response = await fetch(`${SERVER_URL}/auth/sign-in`, {
    const response = await fetch('/api/proxy/auth/sign-in', {
    // const response = await fetch(`/auth/sign-in`, {
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
      throw new Error(error.message || "Sign in failed");
    }

    return response.json() as Promise<AuthResponse>;
  },

};