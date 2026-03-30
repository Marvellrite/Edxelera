export type ResetPasswordStep = 'email' | 'otp' | 'change';

export type ResetPasswordStepCopy = {
   title: string;
   description: string;
};

export type ResetPasswordFlowState = {
   step: ResetPasswordStep;
   email: string;
   resetToken: string;
};
