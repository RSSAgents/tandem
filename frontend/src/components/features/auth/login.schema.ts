import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('errors.invalidEmail'),
  password: z.string().min(6, 'errors.invalidPassword'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export type LoginErrorKeys =
  | 'errors.invalidEmail'
  | 'errors.invalidPassword';
