import { z } from 'zod';

export const signinSchema = z
   .object({
      full_name: z
         .string()
         .min(3, 'Full name must be at least 3 characters long'),
      email: z.email('Invalid email address'),
      password: z
         .string()
         .min(6, 'Password must be at least 6 characters long')
         .max(100, 'Password is too long'),
      confirm_password: z.string().min(6, 'Please confirm your password'),
   })
   .refine((data) => data.password === data.confirm_password, {
      path: ['confirm_password'], // attach error to confirm_password field
      message: 'Passwords do not match',
   });

export type SigninSchema = z.infer<typeof signinSchema>;
