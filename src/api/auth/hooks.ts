import {
  useMutation,
  useQuery,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { SigninSchema } from "@/schemas/sign-in";
import {
  authAPI,
  AuthResponse,
  VerifyOtpPayload,
  ResetPasswordPayload,
  ForgottenPasswordPayload,
  ResendOtpPayload,
} from "./api";

// ============= MUTATIONS =============

export const useSignUp = (
  options?: UseMutationOptions<
    AuthResponse,
    Error,
    Omit<SigninSchema, "confirm_password">
  >
) => {
  return useMutation({
    mutationFn: authAPI.signUp,
    ...options,
  });
};

export const useSignIn = (
  options?: UseMutationOptions<
    AuthResponse,
    Error,
    { email: string; password: string }
  >
) => {
  return useMutation({
    mutationFn: authAPI.signIn,
    ...options,
  });
};

export const useSignOut = (options?: UseMutationOptions<AuthResponse, Error>) => {
  return useMutation({
    mutationFn: authAPI.signOut,
    ...options,
  });
};

export const useVerifyOtp = (
  options?: UseMutationOptions<AuthResponse, Error, VerifyOtpPayload>
) => {
  return useMutation({
    mutationFn: authAPI.verifyOtp,
    ...options,
  });
};

export const useResendOtp = (
  options?: UseMutationOptions<AuthResponse, Error, ResendOtpPayload>
) => {
  return useMutation({
    mutationFn: authAPI.resendOtp,
    ...options,
  });
};

export const useForgottenPassword = (
  options?: UseMutationOptions<AuthResponse, Error, ForgottenPasswordPayload>
) => {
  return useMutation({
    mutationFn: authAPI.forgottenPassword,
    ...options,
  });
};

export const useResetPassword = (
  options?: UseMutationOptions<AuthResponse, Error, ResetPasswordPayload>
) => {
  return useMutation({
    mutationFn: authAPI.resetPassword,
    ...options,
  });
};

// ============= QUERIES =============

export const useGetMe = (
  options?: UseQueryOptions<AuthResponse, Error>
) => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: authAPI.getMe,
    ...options,
  });
};