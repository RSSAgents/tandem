import { z } from 'zod';
import { nameSchema, emailSchema, passwordSchema } from '../validation.schema';

export const registerSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
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
