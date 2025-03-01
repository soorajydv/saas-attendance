import { z } from 'zod';
import { zodQueryValidator } from './schemaValidator';

export const querySchema = z.object({
  page: z
    .string()
    .transform((val) => Number(val)) // Convert to number after string validation
    .refine((val) => Number.isInteger(val) && val > 0, {
      message: 'Page must be a positive integer greater than 0.',
    })
    .optional()
    .default('1'),

  limit: z
    .string()
    .regex(/^\d+$/, 'Limit must be a positive integer.')
    .transform((val) => Number(val))
    .refine((val) => val > 0 && val <= 100, {
      message: 'Limit must be a positive integer between 1 and 100.',
    })
    .optional()
    .default('10'),

  sort: z.enum(['asc', 'desc']).default('desc'),
});

export const queryValidator = zodQueryValidator(querySchema);