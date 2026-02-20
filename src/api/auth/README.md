# Authentication API Integration Guide

This guide explains the React Query-based authentication API integration for the Edxelera application.

## Overview

The authentication system is built with:
- **React Query (TanStack Query)**: For data fetching and caching
- **Zod**: For schema validation
- **Next.js**: For client-side routing and app structure
- **TypeScript**: For type safety

## File Structure

```
api/
  auth/
    api.ts          # API service functions and types
    hooks.ts        # Custom React Query hooks
    index.ts        # Barrel export
    sign-up.ts      # Deprecated - use hooks.ts instead
lib/
  api.ts            # Shared API utilities and configuration
schemas/
  sign-in.ts        # Sign-up validation schema
  login.ts          # Sign-in validation schema
  reset-password.schema.ts  # Password reset schema
```

## Available Hooks

### Mutations

#### `useSignUp(options?)`
Sign up a new user.

```typescript
import { useSignUp } from '@/api/auth';

const { mutate: signUp, isPending, isError, error } = useSignUp({
  onSuccess: (data) => {
    console.log('User created:', data);
    router.push('/home');
  },
  onError: (error) => {
    console.error('Sign up failed:', error.message);
  }
});

// Then call it:
signUp({ fullname: 'John Doe', email: 'john@example.com', password: 'password123' });
```

#### `useSignIn(options?)`
Sign in an existing user.

```typescript
import { useSignIn } from '@/api/auth';

const { mutate: signIn, isPending } = useSignIn({
  onSuccess: (data) => {
    console.log('User signed in:', data);
  }
});

signIn({ email: 'john@example.com', password: 'password123' });
```

#### `useSignOut(options?)`
Sign out the current user.

```typescript
import { useSignOut } from '@/api/auth';

const { mutate: signOut, isPending } = useSignOut({
  onSuccess: () => {
    router.push('/auth');
  }
});

signOut();
```

#### `useVerifyOtp(options?)`
Verify an OTP.

```typescript
import { useVerifyOtp } from '@/api/auth';

const { mutate: verifyOtp, isPending } = useVerifyOtp({
  onSuccess: (data) => {
    console.log('OTP verified');
  }
});

verifyOtp({ email: 'john@example.com', otp: '123456' });
```

#### `useResendOtp(options?)`
Resend OTP to email.

```typescript
import { useResendOtp } from '@/api/auth';

const { mutate: resendOtp, isPending } = useResendOtp();

resendOtp({ email: 'john@example.com' });
```

#### `useForgottenPassword(options?)`
Request password reset.

```typescript
import { useForgottenPassword } from '@/api/auth';

const { mutate: forgottenPassword, isPending } = useForgottenPassword({
  onSuccess: () => {
    toast.success('Check your email for password reset link');
  }
});

forgottenPassword({ email: 'john@example.com' });
```

#### `useResetPassword(options?)`
Reset password with token.

```typescript
import { useResetPassword } from '@/api/auth';

const { mutate: resetPassword, isPending } = useResetPassword({
  onSuccess: () => {
    router.push('/auth');
  }
});

resetPassword({
  email: 'john@example.com',
  token: 'reset_token_from_email',
  password: 'newpassword123'
});
```

### Queries

#### `useGetMe(options?)`
Fetch current user information.

```typescript
import { useGetMe } from '@/api/auth';

const { data: user, isLoading, isError } = useGetMe({
  // Disable the query until you have a token
  enabled: !!localStorage.getItem('token')
});

if (isLoading) return <Spinner />;
if (isError) return <ErrorComponent />;

return <div>Hello, {user?.data?.user?.fullname}</div>;
```

## Complete Example: Sign-In Page

```tsx
'use client';

import { useForm } from 'react-hook-form';
import { LoginSchema, loginSchema } from '@/schemas/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useSignIn } from '@/api/auth';
import { toast } from 'react-toastify';

export default function SignInPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: signIn, isPending } = useSignIn({
    onSuccess: (data) => {
      toast.success('Signed in successfully');
      router.push('/home');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const onSubmit = (data: LoginSchema) => {
    signIn(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}

      <input {...register('password')} type="password" placeholder="Password" />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit" disabled={isPending}>
        {isPending ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}
```

## API Response Structure

All API endpoints return the following structure:

```typescript
interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user?: {
      id: string;
      email: string;
      fullname: string;
      status?: string;
    };
    accessToken?: string;
    refreshToken?: string;
  };
}
```

## Error Handling

Errors are automatically thrown from the API service. You can handle them in the mutation options:

```typescript
const { mutate, error } = useSignUp({
  onError: (error: Error) => {
    // error.message contains the server error message
    toast.error(error.message);
  }
});
```

## Best Practices

1. **Always use mutations for mutations**: Use `useSignUp`, `useSignIn`, etc. for POST/PUT/DELETE requests
2. **Use queries for fetching**: Use `useGetMe` for GET requests
3. **Handle loading states**: Always provide visual feedback when `isPending` is true
4. **Show error messages**: Display error messages from `error.message` to users
5. **Validate on the client**: Use Zod schemas to validate data before sending
6. **Organize by feature**: Keep auth-related code in the auth folder/module

## Configuration

The API base URL is configured via environment variable:

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:3001
```

All requests include:
- `Content-Type: application/json` header
- `credentials: "include"` for cookie-based authentication
- Proper error handling and response validation

## Troubleshooting

### "CORS errors"
Make sure `NEXT_PUBLIC_SERVER_URL` is correct and the backend allows the request origin.

### "Tokens not persisting"
Check that the backend sets cookies with the correct path and domain, and that credentials are included in requests (already configured).

### "Unexpected error messages"
Ensure the backend returns `{ message: "error message" }` in the response body.