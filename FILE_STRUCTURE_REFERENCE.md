# Authentication Module - File Structure Reference

## Complete Directory Structure

```
web-frontend/student/
│
├── AUTHENTICATION_SETUP.md          ⭐ Implementation summary & overview
├── AUTH_QUICK_REFERENCE.md          ⭐ Quick reference for all hooks
├── MIGRATION_GUIDE.md               ⭐ Guide for updating existing pages
│
├── api/
│   └── auth/                        📚 Authentication API module
│       ├── README.md                📖 Comprehensive documentation
│       ├── api.ts                   ⚙️  API service functions
│       ├── hooks.ts                 🎣 React Query hooks
│       ├── index.ts                 📤 Module exports
│       └── sign-up.ts               📝 Deprecated (for migration)
│
├── lib/
│   ├── api.ts                       🔧 Shared API utilities
│   ├── about.ts
│   ├── landing-data.ts
│   └── utils/
│
├── app/
│   ├── providers.tsx                ✅ React Query provider (pre-configured)
│   │
│   └── auth/                        🔐 Authentication pages
│       ├── sign-up/
│       │   └── page.tsx             ✅ UPDATED - Uses React Query
│       │
│       ├── sign-in/
│       │   └── EXAMPLE.page.tsx     📋 Example implementation
│       │
│       ├── forgotten-password/
│       │   └── EXAMPLE.page.tsx     📋 Example implementation
│       │
│       ├── reset-password/
│       │   └── EXAMPLE.page.tsx     📋 Example implementation
│       │
│       └── verify-otp/
│           └── EXAMPLE.page.tsx     📋 Example implementation
│
└── schemas/                         ✔️  Zod validation schemas
    ├── sign-in.ts                   Sign-up schema
    ├── login.ts                     Sign-in schema
    ├── reset-password.schema.ts     Password reset schema
    ├── contact-us.schema.ts
    ├── edit_profile.ts
    ├── send-password-reset.schema.ts
    └── welcome.ts
```

## File-by-File Reference

### 📚 Documentation Files

#### [AUTHENTICATION_SETUP.md](AUTHENTICATION_SETUP.md)
- **Purpose**: Complete implementation overview
- **Contains**: File structure, changes made, features, integration notes
- **Audience**: Anyone wanting full context of the integration
- **Read time**: ~15 minutes

#### [AUTH_QUICK_REFERENCE.md](AUTH_QUICK_REFERENCE.md)
- **Purpose**: Quick lookup for common tasks
- **Contains**: Hook examples, patterns, tips, cheat sheet
- **Audience**: Developers actively coding
- **Read time**: ~5 minutes (reference document)

#### [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)
- **Purpose**: How to update existing pages
- **Contains**: Before/after examples, step-by-step guide, checklist
- **Audience**: Developers migrating old code
- **Read time**: ~10 minutes

---

### ⚙️ Core API Files

#### [api/auth/api.ts](api/auth/api.ts)
- **Purpose**: API service functions
- **Exports**:
  - `authAPI` object with methods:
    - `authAPI.signUp(data)`
    - `authAPI.signIn(data)`
    - `authAPI.signOut()`
    - `authAPI.verifyOtp(data)`
    - `authAPI.resendOtp(data)`
    - `authAPI.forgottenPassword(data)`
    - `authAPI.resetPassword(data)`
    - `authAPI.getMe()`
  - Types:
    - `AuthResponse`
    - `VerifyOtpPayload`
    - `ResetPasswordPayload`
    - `ForgottenPasswordPayload`
    - `ResendOtpPayload`
- **Usage**: Imported by hooks.ts, not directly in components
- **Size**: ~150 lines

#### [api/auth/hooks.ts](api/auth/hooks.ts)
- **Purpose**: React Query hooks wrapping API calls
- **Exports** (Mutations):
  - `useSignUp(options?)`
  - `useSignIn(options?)`
  - `useSignOut(options?)`
  - `useVerifyOtp(options?)`
  - `useResendOtp(options?)`
  - `useForgottenPassword(options?)`
  - `useResetPassword(options?)`
- **Exports** (Queries):
  - `useGetMe(options?)`
- **Usage**: Import directly in components
- **Size**: ~100 lines

#### [api/auth/index.ts](api/auth/index.ts)
- **Purpose**: Barrel export for the auth module
- **Exports**: Everything from api.ts and hooks.ts
- **Usage**: `import { useSignUp } from '@/api/auth'`
- **Size**: 2 lines

#### [api/auth/README.md](api/auth/README.md)
- **Purpose**: Detailed API documentation
- **Contains**: 
  - Overview
  - File structure
  - Complete hook usage examples
  - API response structure
  - Error handling guide
  - Best practices
  - Configuration
  - Troubleshooting
- **Read time**: ~20 minutes

#### [api/auth/sign-up.ts](api/auth/sign-up.ts)
- **Purpose**: Deprecated - kept for reference
- **Note**: Replaced by hooks.ts
- **Usage**: Do not use, refer to hooks.ts instead
- **Status**: 🗑️ Deprecated

---

### 🔧 Utility Files

#### [lib/api.ts](lib/api.ts)
- **Purpose**: Shared API configuration and utilities
- **Exports**:
  - `API_BASE_URL` - Configured from env
  - `ApiErrorResponse` - Type for error responses
  - `ApiSuccessResponse<T>` - Type for success responses
  - `ApiResponse<T>` - Union type
  - `handleApiResponse(response)` - Error handler
  - `apiFetch(endpoint, options)` - Centralized fetch wrapper
- **Usage**: Can be used for other API integrations
- **Size**: ~40 lines

---

### ✅ Implementation Files

#### [app/auth/sign-up/page.tsx](app/auth/sign-up/page.tsx)
- **Status**: ✅ UPDATED - Uses React Query
- **Previous**: Used raw fetch()
- **Current**: Uses `useSignUp()` hook
- **Features**:
  - Form validation with Zod
  - React Hook Form integration
  - Loading states with `isPending`
  - Error handling with toast
  - Success callback with navigation
  - Password visibility toggle
- **Size**: ~180 lines

---

### 📋 Example Implementation Files

These files demonstrate how to implement each auth flow. Copy them and rename (remove `EXAMPLE.` prefix) to use in your app.

#### [app/auth/sign-in/EXAMPLE.page.tsx](app/auth/sign-in/EXAMPLE.page.tsx)
- **Shows**: How to implement sign-in with React Query
- **Demonstrates**:
  - Using `useSignIn()` hook
  - Form validation
  - Error/success handling
  - Loading states
  - Link to password reset
- **Copy to**: `app/auth/sign-in/page.tsx` (if implementing)

#### [app/auth/forgotten-password/EXAMPLE.page.tsx](app/auth/forgotten-password/EXAMPLE.page.tsx)
- **Shows**: How to request password reset
- **Demonstrates**:
  - Using `useForgottenPassword()` hook
  - Email validation only
  - Custom Zod schema
  - Success toast with explanation
- **Copy to**: `app/auth/forgotten-password/page.tsx` (if implementing)

#### [app/auth/reset-password/EXAMPLE.page.tsx](app/auth/reset-password/EXAMPLE.page.tsx)
- **Shows**: How to reset password with token
- **Demonstrates**:
  - Using `useResetPassword()` hook
  - URL parameter validation
  - Invalid link handling
  - Password confirmation
  - Token-based security
- **Copy to**: `app/auth/reset-password/page.tsx` (if implementing)

#### [app/auth/verify-otp/EXAMPLE.page.tsx](app/auth/verify-otp/EXAMPLE.page.tsx)
- **Shows**: How to verify email with OTP
- **Demonstrates**:
  - Using `useVerifyOtp()` and `useResendOtp()` hooks
  - Resend timer (60 seconds)
  - OTP input validation
  - Invalid link handling
  - Multiple attempts support
- **Copy to**: `app/auth/verify-otp/page.tsx` (if implementing)

---

## How Files Work Together

```
Component (page.tsx)
    ↓
    imports useSignUp() from api/auth/hooks.ts
    ↓
hooks.ts 
    ↓
    imports authAPI from api/auth/api.ts
    ↓
api.ts
    ↓
    makes fetch() calls to backend
    ↓
    returns Promise<AuthResponse>
```

## Configuration

### Environment Variables Required

```env
# .env.local
NEXT_PUBLIC_SERVER_URL=http://localhost:3001
```

### Already Configured

- ✅ React Query provider in `app/providers.tsx`
- ✅ Fetch credentials include cookies
- ✅ Content-Type headers set to application/json

---

## Getting Started Checklist

- [ ] Read [AUTHENTICATION_SETUP.md](AUTHENTICATION_SETUP.md) for overview
- [ ] Check [AUTH_QUICK_REFERENCE.md](AUTH_QUICK_REFERENCE.md) for hook examples
- [ ] Review [app/auth/sign-up/page.tsx](app/auth/sign-up/page.tsx) as implemented example
- [ ] Look at `EXAMPLE.page.tsx` files for other auth flows
- [ ] Use [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) when updating other pages
- [ ] Set `NEXT_PUBLIC_SERVER_URL` in `.env.local`
- [ ] Test sign-up flow to verify integration
- [ ] Implement other auth pages as needed

---

## Common Tasks

### I want to use sign-up
1. See: [app/auth/sign-up/page.tsx](app/auth/sign-up/page.tsx) ✅ Already done!

### I want to implement sign-in
1. Copy: [app/auth/sign-in/EXAMPLE.page.tsx](app/auth/sign-in/EXAMPLE.page.tsx)
2. Rename to: `sign-in/page.tsx`
3. Read: [AUTH_QUICK_REFERENCE.md](AUTH_QUICK_REFERENCE.md)

### I want to implement password reset
1. Copy: [app/auth/forgotten-password/EXAMPLE.page.tsx](app/auth/forgotten-password/EXAMPLE.page.tsx)
2. Copy: [app/auth/reset-password/EXAMPLE.page.tsx](app/auth/reset-password/EXAMPLE.page.tsx)
3. Rename to: `forgotten-password/page.tsx` and `reset-password/page.tsx`
4. Read: [AUTH_QUICK_REFERENCE.md](AUTH_QUICK_REFERENCE.md)

### I want to implement OTP verification
1. Copy: [app/auth/verify-otp/EXAMPLE.page.tsx](app/auth/verify-otp/EXAMPLE.page.tsx)
2. Rename to: `verify-otp/page.tsx`
3. Read: [AUTH_QUICK_REFERENCE.md](AUTH_QUICK_REFERENCE.md)

### I want to get current user in my component
1. Import: `import { useGetMe } from '@/api/auth'`
2. Use in component:
   ```typescript
   const { data: response } = useGetMe();
   const user = response?.data?.user;
   ```

### I want to update an existing page to use hooks
1. Read: [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)
2. Follow step-by-step instructions
3. Use examples from [AUTH_QUICK_REFERENCE.md](AUTH_QUICK_REFERENCE.md)

### I want to understand the full integration
1. Read: [AUTHENTICATION_SETUP.md](AUTHENTICATION_SETUP.md)
2. Read: [api/auth/README.md](api/auth/README.md)
3. Review actual code in hooks.ts and api.ts

---

## Support Resources

- **Quick answers**: [AUTH_QUICK_REFERENCE.md](AUTH_QUICK_REFERENCE.md)
- **Implementation examples**: `EXAMPLE.page.tsx` files
- **Detailed docs**: [api/auth/README.md](api/auth/README.md)
- **Migrating code**: [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)
- **Full overview**: [AUTHENTICATION_SETUP.md](AUTHENTICATION_SETUP.md)
