import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AuthResponse } from "../types";
import { signInAPI } from "./api";

export const useSignIn = (
  options?: UseMutationOptions<
    AuthResponse,
    Error,
    { email: string; password: string }
  >
) => {
  return useMutation({
    mutationFn: signInAPI.signIn,
    ...options,
  });
};