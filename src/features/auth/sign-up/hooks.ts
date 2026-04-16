import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AuthResponse } from "../types";
import { SignUpSchema } from "./types";
import { signUpAPI } from "./api";

export const useSignUp = (
  options?: UseMutationOptions<
    AuthResponse,
    Error,
    Omit<SignUpSchema, "confirm_password">
  >
) => {
  return useMutation({
    mutationFn: signUpAPI.signUp,
    ...options,
  });
};
