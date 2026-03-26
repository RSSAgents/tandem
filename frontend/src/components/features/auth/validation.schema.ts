import { z } from 'zod';

export const emailSchema = z.email('errors.invalidEmail');

export const passwordSchema = z.string().min(6, 'errors.passwordTooShort');

export const nameSchema = z.string().min(2, 'errors.nameTooShort');
