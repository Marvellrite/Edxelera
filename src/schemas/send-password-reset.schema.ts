import { z } from 'zod';

export const sendPassResetSchema = z
   .object({
      email: z.email('Invalid email address'),
   })


export type SendPassResetSchema = z.infer<typeof sendPassResetSchema>;
