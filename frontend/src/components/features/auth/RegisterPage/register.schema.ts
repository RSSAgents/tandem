import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(2, 'errors.nameTooShort'),
    email: z.string().email('errors.invalidEmail'),
    password: z.string().min(6, 'errors.passwordTooShort'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'errors.passwordsDontMatch',
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
export type RegisterErrorKeys =
  | 'errors.nameTooShort'
  | 'errors.invalidEmail'
  | 'errors.passwordTooShort'
  | 'errors.passwordsDontMatch';
