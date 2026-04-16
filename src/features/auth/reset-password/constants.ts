export const FLOW_EMAIL_KEY = 'reset-password-email';
export const FLOW_TOKEN_KEY = 'reset-password-token';
export const SUCCESS_TOAST_DURATION_MS = 1800;
export const RESET_PASSWORD_LOGO =
   'https://res.cloudinary.com/dx5iohojj/image/upload/v1773340637/repo-images/public/images/edx_logo_1.png';

export const STEP_COPY: Record<ResetPasswordStep, ResetPasswordStepCopy> = {
   email: {
      title: 'Reset your password',
      description: 'Enter the email associated with your account.',
   },
   otp: {
      title: 'Verify your code',
      description: 'Enter the verification code sent to your email.',
   },
   change: {
      title: 'Create a new password',
      description: 'Choose a new password for your account.',
   },
};