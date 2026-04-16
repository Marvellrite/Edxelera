import { WEB_CLIENT_HEADER } from "@/constants";
import { AuthResponse } from "../types";
import { ResetPasswordPayload } from "./types";
import env from "@/lib/env";

// Auth API Functions
export const authAPI = {

  resetPassword: async (data: ResetPasswordPayload) => {
    const response = await fetch(`${env.NEXT_PUBLIC_PROXY_URL}/auth/reset-password`, {
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
      throw new Error(error.message || "Password reset failed");
    }

    return response.json() as Promise<AuthResponse>;
  },

}