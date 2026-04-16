import { WEB_CLIENT_HEADER } from "@/constants";
import { AuthResponse, ForgottenPasswordPayload, ResendOtpPayload, VerifyOtpPayload } from "./types";
import env from "@/lib/config/client/env";

// Auth API Functions
export const authAPI = {

  verifyOtp: async (data: VerifyOtpPayload) => {
    const response = await fetch(`${env.NEXT_PUBLIC_PROXY_URL}/auth/verify-otp`, {
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
      throw new Error(error.message || "OTP verification failed");
    }

    return response.json() as Promise<AuthResponse>;
  },

  resendOtp: async (data: ResendOtpPayload) => {
    const response = await fetch(`${env.NEXT_PUBLIC_PROXY_URL}/auth/resend-otp`, {
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
      throw new Error(error.message || "Failed to resend OTP");
    }

    return response.json() as Promise<AuthResponse>;
  },

  forgottenPassword: async (data: ForgottenPasswordPayload) => {
    const response = await fetch(`${env.NEXT_PUBLIC_PROXY_URL}/auth/forgotten-password`, {
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
      throw new Error(error.message || "Failed to process forgotten password");
    }

    return response.json() as Promise<AuthResponse>;
  },


};