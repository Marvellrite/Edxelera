import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import meAPI from "./api";
import { AuthResponse } from "../types";

export const useGetMe = (
  options?: UseQueryOptions<AuthResponse, Error>
) => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: meAPI.getMe,
    ...options,
  });
};