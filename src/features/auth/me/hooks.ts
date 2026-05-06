'use client';

import { useMemo } from 'react';
import { useQuery, UseQueryOptions } from "@tanstack/react-query";


import meAPI from "./api";
import { AuthResponse } from "../types";
import { SessionUser } from './types';

export const useGetMe = (
  options?: UseQueryOptions<AuthResponse, Error>
) => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: meAPI.getMe,
    ...options,
  });
};


export const useCurrentUserSession = () => {
  const query = useGetMe();

  const user = useMemo(() => {
    const payload = query.data?.data as (SessionUser & { user?: SessionUser }) | undefined;
    if (!payload) return null;
    return payload.user ?? payload;
  }, [query.data]);

  const studentId = user?.id ?? null;

  return {
    ...query,
    user,
    studentId,
    isAuthenticated: Boolean(studentId),
  };
};