# Migration Guide: Updating Pages to Use Auth Hooks

This guide helps you update existing pages to use the new React Query authentication system.

## Before & After Comparison

### ❌ Before (Old Pattern - Direct Fetch)

```typescript
const onSubmit = async (data: LoginSchema) => {
  const response = await fetch(`${ServerURL}/auth/sign-in`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (response.ok) {
    router.push('/home');
  } else {
    const error = await response.json();
    console.error(error.message);
  }
};
```

### ✅ After (New Pattern - React Query)

```typescript
import { useSignIn } from '@/api/auth';

const { mutate: signIn, isPending } = useSignIn({
  onSuccess: () => router.push('/home'),
  onError: (error) => console.error(error.message),
});

const onSubmit = (data: LoginSchema) => {
  signIn(data);
};
```

## Step-by-Step Migration

### Step 1: Import the Hook

**Old:**
```typescript
const ServerURL = process.env.NEXT_PUBLIC_SERVER_URL;
```

**New:**
```typescript
import { useSignUp } from '@/api/auth'; // or useSignIn, etc.
```

### Step 2: Replace Component Logic

**Old:**
```typescript
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

const onSubmit = async (data) => {
  setIsLoading(true);
  setError(null);
  
  try {
    const response = await fetch(...);
    if (!response.ok) throw new Error('Failed');
    
    const result = await response.json();
    router.push('/home');
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};
```

**New:**
```typescript
const { mutate: signUp, isPending, error } = useSignUp({
  onSuccess: () => router.push('/home'),
  onError: (error) => {
    // Error is automatically available
  },
});

const onSubmit = (data) => {
  signUp(data);
};
```

### Step 3: Update Button States

**Old:**
```typescript
<button disabled={isLoading}>
  {isLoading ? 'Loading...' : 'Submit'}
</button>
```

**New:**
```typescript
<button disabled={isPending}>
  {isPending ? 'Loading...' : 'Submit'}
</button>
```

### Step 4: Update Error Display

**Old:**
```typescript
{error && <p className="text-red-500">{error}</p>}
```

**New:**
```typescript
{error && <p className="text-red-500">{error.message}</p>}
```

## Complete Examples

### Example 1: Simple Sign In Form

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSignIn } from '@/api/auth';
import { LoginSchema, loginSchema } from '@/schemas/login';
import { zodResolver } from '@hookform/resolvers/zod';

export default function SignInPage() {
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: signIn, isPending, error } = useSignIn({
    onSuccess: () => {
      router.push('/home');
    },
  });

  const onSubmit = (data: LoginSchema) => {
    signIn(data);
  };

  const email = watch('email');
  const password = watch('password');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}

      <input {...register('password')} type="password" placeholder="Password" />
      {errors.password && <span>{errors.password.message}</span>}

      {error && <p className="text-red-500">{error.message}</p>}

      <button disabled={!email || !password || isPending}>
        {isPending ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}
```

### Example 2: Multi-Step Form (Sign Up)

```typescript
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSignUp, useVerifyOtp } from '@/api/auth';
import { SigninSchema, signinSchema } from '@/schemas/sign-in';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [userEmail, setUserEmail] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<SigninSchema>({
    resolver: zodResolver(signinSchema),
  });

  const { mutate: signUp, isPending: isSigningUp } = useSignUp({
    onSuccess: (data) => {
      toast.success('Account created! Check your email for OTP.');
      setUserEmail(data.data?.user?.email || '');
      setStep('otp');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp({
    onSuccess: () => {
      toast.success('Email verified! Redirecting...');
      router.push('/home');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: SigninSchema) => {
    const { confirm_password, ...signupData } = data;
    signUp(signupData);
  };

  if (step === 'otp') {
    return (
      <OTPStep
        email={userEmail}
        onSubmit={(otp) => verifyOtp({ email: userEmail, otp })}
        isPending={isVerifying}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
      <button disabled={isSigningUp}>
        {isSigningUp ? 'Creating...' : 'Sign Up'}
      </button>
    </form>
  );
}
```

### Example 3: Using Hooks in Multiple Components

```typescript
// ✅ Header Component - Get Current User
import { useGetMe } from '@/api/auth';

export function Header() {
  const { data: response } = useGetMe({
    enabled: true, // Always fetch
  });

  const user = response?.data?.user;

  return (
    <header>
      <p>Hello, {user?.fullname || 'Guest'}</p>
    </header>
  );
}

// ✅ Logout Button Component
import { useSignOut } from '@/api/auth';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();
  const { mutate: signOut, isPending } = useSignOut({
    onSuccess: () => {
      router.push('/auth');
    },
  });

  return (
    <button onClick={() => signOut()} disabled={isPending}>
      {isPending ? 'Logging out...' : 'Logout'}
    </button>
  );
}
```

## Common Patterns

### Pattern 1: Form with Validation + API Call

```typescript
const { register, handleSubmit, formState: { errors } } = useForm<FormSchema>({
  resolver: zodResolver(formSchema),
});

const { mutate: submitForm, isPending } = useSignUp({
  onSuccess: handleSuccess,
  onError: handleError,
});

<form onSubmit={handleSubmit((data) => submitForm(data))}>
  {/* form fields */}
</form>
```

### Pattern 2: Conditional Authentication Check

```typescript
const [isAuthenticated, setIsAuthenticated] = useState(false);

const { data: user, isLoading } = useGetMe({
  enabled: isAuthenticated,
});

useEffect(() => {
  setIsAuthenticated(!!localStorage.getItem('authToken'));
}, []);

return isLoading ? <Spinner /> : user ? <Dashboard /> : <Login />;
```

### Pattern 3: Error Handling with User Feedback

```typescript
const { mutate, error, isPending } = useSignIn();

return (
  <>
    {error && (
      <Alert type="error">
        {error.message}
        <button onClick={() => mutate(data)}>Retry</button>
      </Alert>
    )}
    <button onClick={() => mutate(data)} disabled={isPending} />
  </>
);
```

## Checklist for Migration

- [ ] Import the appropriate hook (`useSignUp`, `useSignIn`, etc.)
- [ ] Remove manual `useState` for loading/error states
- [ ] Replace `fetch()` call with the hook's `mutate` function
- [ ] Update button disabled state to use `isPending`
- [ ] Update or remove error display (use `error?.message` if needed)
- [ ] Add success/error callbacks in hook options
- [ ] Test the component thoroughly
- [ ] Check network tab in DevTools to verify requests
- [ ] Verify redirect/navigation works correctly
- [ ] Ensure loading state is displayed to user

## TypeScript Tips

### Get Better Type Safety

```typescript
import { useSignUp } from '@/api/auth';
import type { AuthResponse } from '@/api/auth/api';

const { mutate, data, error } = useSignUp({
  onSuccess: (data: AuthResponse) => {
    // data is fully typed
    const userId = data.data?.user?.id;
  },
});
```

### Custom Hook for Your Specific Needs

```typescript
// hooks/useAuthSignUp.ts
import { useSignUp } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export function useAuthSignUp() {
  const router = useRouter();
  
  return useSignUp({
    onSuccess: (data) => {
      toast.success('Account created successfully!');
      router.push('/auth/verify-otp');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

// In your component:
const { mutate: signUp, isPending } = useAuthSignUp();
```

## Troubleshooting

### Issue: "isPending is always false"
**Solution**: Make sure you're calling `mutate()` to trigger the request.

### Issue: "Error is not being shown"
**Solution**: The error is available as `error?.message`. Check you're using it correctly.

### Issue: "Data is undefined after success"
**Solution**: Check the `onSuccess` callback - access data from the parameter, not the `data` ref.

### Issue: "Component is not making the request"
**Solution**: Ensure you're calling the `mutate` function with the correct data shape.

## Next Steps

1. Start with pages that have simple submit forms
2. Test thoroughly before moving to complex workflows
3. Use the example pages as reference
4. Check browser DevTools Network tab to verify requests
5. Review error handling in each page
