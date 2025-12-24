import { email, z } from 'zod';

export const contactUsSchema = z.object({
   firstName: z.string('First name is required'),
   lastName: z.string().optional(),
   email: z.email('Invalid email address'),
   phoneNo: z.number('Phone Number is required'),
   password: z.string().min(6, 'Password must be at least 6 characters long'),
   message: z.string().min(3, 'A Message is required'),
});

export type ContactUsSchema = z.infer<typeof contactUsSchema>;
