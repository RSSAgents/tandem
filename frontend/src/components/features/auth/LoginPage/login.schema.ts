import { z } from 'zod';
import { emailSchema, passwordSchema } from '../validation.schema';

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export type LoginErrorKeys = 'errors.invalidEmail' | 'errors.invalidPassword';
