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

export interface ForgottenPasswordPayload {
  email: string;
}

export interface ResendOtpPayload {
  email: string;
}