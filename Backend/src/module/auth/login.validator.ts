import { z } from 'zod';
import { zodSchemaValidator } from '../../validators/schemaValidator';

export const emailSchema = z.string().email('Invalid email format');
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[a-zA-Z]/, 'Password must contain at least one letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const loginValidator = zodSchemaValidator(loginSchema);

export default loginValidator;
