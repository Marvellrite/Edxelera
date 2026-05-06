export type SessionUser = {
  id?: string;
  email?: string;
  fullname?: string;
  profile_img?: string | null;
  role?: 'admin' | 'user';
  status?: string;
  is_verified?: boolean;
};
