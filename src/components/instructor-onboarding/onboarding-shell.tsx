import Image from 'next/image';
import { ReactNode } from 'react';

type OnboardingShellProps = {
  children: ReactNode;
};

export function OnboardingShell({ children }: OnboardingShellProps) {
  return (
    <main className="min-h-screen bg-surface">
      <section className="grid min-h-screen grid-cols-1 lg:grid-cols-10">
        <div className="flex px-4 py-6 sm:px-8 lg:col-span-6 lg:px-14 lg:py-10">
          <div className="mx-auto flex w-full max-w-xl flex-col gap-8">
            <Image src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340420/repo-images/public/assets/edxelera-logo.png" alt="Edxelera Logo" width={180} height={42} priority />
            {children}
          </div>
        </div>

        <aside className="relative hidden overflow-hidden bg-neutral-900 lg:col-span-4 lg:block">
          <Image
            src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340422/repo-images/public/assets/instructor/auth/instructor.jpg"
            alt="Instructor onboarding"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 to-black/15" />
        </aside>
      </section>
    </main>
  );
}
