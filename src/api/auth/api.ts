import { SigninSchema } from "@/schemas/sign-in";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const WEB_CLIENT_HEADER = { "x-client-type": "web" } as const;

// Types for auth responses
export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user?: {
      id: string;
      email: string;
      fullname: string;
      status?: string;
    };
    id?: string;
    email?: string;
    fullname?: string;
    profile_img?: string | null;
    role?: "admin" | "user";
    status?: string;
    is_verified?: boolean;
    accessToken?: string;
    refreshToken?: string;
  };
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
  otp_type?: string;
}

export interface ResetPasswordPayload {
  email: string;
  token: string;
  password: string;
}

export interface ForgottenPasswordPayload {
  email: string;
}

export interface ResendOtpPayload {
  email: string;
}

// Auth API Functions
export const authAPI = {
  signUp: async (data: Omit<SigninSchema, "confirm_password">) => {
    const response = await fetch(`${SERVER_URL}/auth/sign-up`, {
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

  signOut: async () => {
    const response = await fetch(`${SERVER_URL}/auth/sign-out`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...WEB_CLIENT_HEADER,
      },
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Sign out failed");
    }

    return response.json() as Promise<AuthResponse>;
  },

  verifyOtp: async (data: VerifyOtpPayload) => {
    const response = await fetch(`${SERVER_URL}/auth/verify-otp`, {
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
    const response = await fetch(`${SERVER_URL}/auth/resend-otp`, {
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
    const response = await fetch(`${SERVER_URL}/auth/forgotten-password`, {
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

  resetPassword: async (data: ResetPasswordPayload) => {
    const response = await fetch(`${SERVER_URL}/auth/reset-password`, {
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

  getMe: async () => {
    const response = await fetch('/api/proxy/auth/me', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...WEB_CLIENT_HEADER,
      },
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch user data");
    }

    return response.json() as Promise<AuthResponse>;
  },
};