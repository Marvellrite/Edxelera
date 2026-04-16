import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AuthResponse } from "../../types";
import { ResetPasswordPayload } from "../types";
import { resetPasswordAPI } from "../api";

export const useResetPassword = (
  options?: UseMutationOptions<AuthResponse, Error, ResetPasswordPayload>
) => {
  return useMutation({
    mutationFn: resetPasswordAPI.resetPassword,
    ...options,
  });
};