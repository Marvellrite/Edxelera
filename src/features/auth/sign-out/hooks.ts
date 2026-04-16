import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AuthResponse } from "../types";
import signOutAPI from "./api";

export const useSignOut = (options?: UseMutationOptions<AuthResponse, Error>) => {
  return useMutation({
    mutationFn: signOutAPI.signOut,
    ...options,
  });
};
