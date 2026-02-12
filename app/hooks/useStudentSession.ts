'use client';

import { useMemo } from 'react';
import { useGetMe } from '@/api/auth';

type SessionUser = {
  id?: string;
  email?: string;
  fullname?: string;
  profile_img?: string | null;
  role?: 'admin' | 'user';
  status?: string;
  is_verified?: boolean;
};

export const useStudentSession = () => {
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

