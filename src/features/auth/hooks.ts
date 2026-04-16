import {
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";

import {
  AuthResponse,
  VerifyOtpPayload,
  ForgottenPasswordPayload,
  ResendOtpPayload,
} from "./types";
import { authAPI } from "./api";

// ============= MUTATIONS =============


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
