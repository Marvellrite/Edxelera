import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { EditUserPayload, UserResponse, userAPI } from './api';

export const useGetUser = (userId: string, options?: UseQueryOptions<UserResponse, Error>) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => userAPI.getUser(userId),
    enabled: Boolean(userId),
    ...options,
  });
};

export const useEditUser = (options?: UseMutationOptions<UserResponse, Error, EditUserPayload>) => {
  return useMutation({
    mutationFn: userAPI.editUser,
    ...options,
  });
};

export const useDeleteUser = (options?: UseMutationOptions<UserResponse, Error, string>) => {
  return useMutation({
    mutationFn: userAPI.deleteUser,
    ...options,
  });
};
