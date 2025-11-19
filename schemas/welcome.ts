import { z } from 'zod';

export const welcomeSchema = z.object({
   DOB: z.string().min(3, 'DOB must be at least 3 characters long'), // adjust min length if needed
   location: z.string().min(3, 'Location must be at least 3 characters long'), // assuming Location is a string, not email
   bio: z
      .string()
      .min(6, 'Bio must be at least 6 characters long')
      .max(100, 'Bio is too long'),
   profileImage: z
      .any()
      .refine((files) => files?.length > 0, 'Profile image is required')
      .refine((files) => files?.[0]?.size <= 4_000_000, 'Max file size is 4MB')
      .refine(
         (files) =>
            ['image/jpeg', 'image/png', 'image/gif'].includes(files?.[0]?.type),
         'Only JPG, PNG, or GIF allowed',
      ),
});

// Correct type inference
export type WelcomeSchema = z.infer<typeof welcomeSchema>;
