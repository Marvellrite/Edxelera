import 'server-only';

import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { redirect } from 'next/navigation';

type AuthPayload = {
  user_id?: string;
  role?: 'user' | 'admin';
  otp_type?: string;
};

export const getAuthenticatedUserId = async (): Promise<string> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;
  console.log('Here=>', token)

  if (!token) {
    redirect('/auth');
  }

  console.log('Access Token=>', token)
  
  const candidateSecrets = [process.env.JWT_ACCESS_SECRET, process.env.JWT_SECRET].filter(
    (value): value is string => Boolean(value)
  );
  if (!candidateSecrets.length) {
    redirect('/auth');
  }
  
  console.log('JWT Access Secret=>', process.env.JWT_ACCESS_SECRET )

  for (const currentSecret of candidateSecrets) {
    try {
      const secret = new TextEncoder().encode(currentSecret);
      const { payload } = await jwtVerify(token, secret);
      console.log('Here 2')
      const userId = (payload as AuthPayload).user_id;

      if (typeof userId === 'string' && userId.length > 0) {
        return userId;
      }
    } catch {
      continue;
    }
  }

  redirect('/auth');
};
