import { cookies } from 'next/headers';
import VerifyEmailClient from './verify-email-client';

const decodeEmail = (email: string) => {
  try {
    return decodeURIComponent(email);
  } catch {
    return '';
  }
};

export default async function Page() {
  const cookieStore = await cookies();
  const pendingEmail = cookieStore.get('pendingEmail')?.value || '';

  return <VerifyEmailClient email={decodeEmail(pendingEmail)} />;
}
