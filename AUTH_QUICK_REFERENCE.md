# Auth API Quick Reference

## Hooks Overview

### ✅ Sign Up
```typescript
import { useSignUp } from '@/api/auth';

const { mutate: signUp, isPending, error } = useSignUp({
  onSuccess: (data) => router.push('/home'),
});

signUp({ fullname: 'John', email: 'john@example.com', password: 'pass123' });
```

### ✅ Sign In
```typescript
import { useSignIn } from '@/api/auth';

const { mutate: signIn, isPending } = useSignIn({
  onSuccess: (data) => router.push('/home'),
});

signIn({ email: 'john@example.com', password: 'pass123' });
```

### ✅ Get Current User
```typescript
import { useGetMe } from '@/api/auth';

const { data: response, isLoading, isError } = useGetMe({
  enabled: !!token, // Only fetch if user is logged in
});

const user = response?.data?.user;
```

### ✅ Sign Out
```typescript
import { useSignOut } from '@/api/auth';

const { mutate: signOut, isPending } = useSignOut({
  onSuccess: () => router.push('/auth'),
});

signOut();
```

### ✅ Verify OTP
```typescript
import { useVerifyOtp } from '@/api/auth';

const { mutate: verifyOtp, isPending } = useVerifyOtp({
  onSuccess: () => console.log('Email verified'),
});

verifyOtp({ email: 'john@example.com', otp: '123456' });
```

### ✅ Resend OTP
```typescript
import { useResendOtp } from '@/api/auth';

const { mutate: resendOtp, isPending } = useResendOtp();

resendOtp({ email: 'john@example.com' });
```

### ✅ Forgotten Password
```typescript
import { useForgottenPassword } from '@/api/auth';

const { mutate: forgottenPassword, isPending } = useForgottenPassword({
  onSuccess: () => toast.success('Check your email'),
});

forgottenPassword({ email: 'john@example.com' });
```

### ✅ Reset Password
```typescript
import { useResetPassword } from '@/api/auth';

const { mutate: resetPassword, isPending } = useResetPassword({
  onSuccess: () => router.push('/auth'),
});

resetPassword({
  email: 'john@example.com',
  token: 'token_from_email',
  password: 'newpassword123',
});
```

## Common Patterns

### Pattern 1: Form Submission
```typescript
const { mutate: signUp, isPending } = useSignUp({
  onSuccess: () => router.push('/home'),
  onError: (error) => toast.error(error.message),
});

const onSubmit = (data) => signUp(data);

<button disabled={isPending}>
  {isPending ? 'Loading...' : 'Submit'}
</button>
```

### Pattern 2: Conditional Data Loading
```typescript
const { data: user, isLoading } = useGetMe({
  enabled: !!localStorage.getItem('token'),
});

return isLoading ? <Spinner /> : <UserProfile user={user?.data?.user} />;
```

### Pattern 3: Error Handling
```typescript
const { mutate, error, isPending } = useSignIn();

return (
  <>
    <button onClick={() => mutate(data)} disabled={isPending} />
    {error && <p>{error.message}</p>}
  </>
);
```

### Pattern 4: Success with Navigation
```typescript
const router = useRouter();

const { mutate } = useSignUp({
  onSuccess: (data) => {
    toast.success('Account created!');
    router.push('/home');
  },
});
```

## Return Values

Every mutation/query returns:
- `data`: The response data
- `error`: Error object (has `.message` property)
- `isPending`: Loading state (mutations) / `isLoading` (queries)
- `mutate`: Function to trigger mutation
- `queryKey`: For cache management

## Example Full Component

```typescript
'use client';

import { useSignUp } from '@/api/auth';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const { mutate: signUp, isPending } = useSignUp({
    onSuccess: () => {
      router.push('/home');
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const onSubmit = (data) => {
    signUp(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('fullname')} />
      <input {...register('email')} />
      <input {...register('password')} type="password" />
      <button disabled={isPending}>
        {isPending ? 'Creating...' : 'Sign Up'}
      </button>
    </form>
  );
}
```

## Response Structure

```typescript
// Success Response
{
  success: true,
  message: "Success message",
  data: {
    user: {
      id: "string",
      email: "string",
      fullname: "string",
      status?: "string"
    },
    accessToken?: "string",
    refreshToken?: "string"
  }
}

// Error Response
{
  success: false,
  message: "Error message"
}
```

## Tips & Tricks

1. **Disable during loading**
   ```typescript
   <button disabled={isPending || !email || !password}>Sign Up</button>
   ```

2. **Show loading text**
   ```typescript
   {isPending ? 'Loading...' : 'Submit'}
   ```

3. **Access error message**
   ```typescript
   error?.message || 'Something went wrong'
   ```

4. **Conditional requests**
   ```typescript
   useGetMe({ enabled: !!token })
   ```

5. **Invalidate cache after update**
   ```typescript
   import { useQueryClient } from '@tanstack/react-query';
   const queryClient = useQueryClient();
   
   const { mutate } = useSignUp({
     onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
     },
   });
   ```

## Files Location Reference

- **Hooks**: `api/auth/hooks.ts`
- **API Functions**: `api/auth/api.ts`
- **Documentation**: `api/auth/README.md`
- **Examples**: `app/auth/*/EXAMPLE.page.tsx`
- **Utils**: `lib/api.ts`
