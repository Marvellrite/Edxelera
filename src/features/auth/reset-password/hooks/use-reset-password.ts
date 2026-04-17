import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AuthResponse } from "../../types";
import {  ForgottenPasswordPayload } from '../types'
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

export const useForgottenPassword = (
  options?: UseMutationOptions<AuthResponse, Error, ForgottenPasswordPayload>
) => {
  return useMutation({
    mutationFn: resetPasswordAPI.forgottenPassword,
    ...options,
  });
};