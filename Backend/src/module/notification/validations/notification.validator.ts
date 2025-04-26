import { z } from 'zod';
import { zodSchemaValidator } from '../../../utils/validator/schemaValidator';

export const notificationValidationSchema = z
  .object({
    title: z
      .string()
      .min(5, 'Title is required')
      .max(30, 'Title should not be more than 30 characters'),
    image: z.string().url().optional(),
    type: z.number().int().min(0).max(5).default(0).optional(),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters long'),
    role: z.enum(['D', 'P']).optional(),
    users: z
      .array(z.string().regex(/^[a-fA-F0-9]{24}$/, 'Invalid user ID'))
      .min(1, 'At least one user is required')
      .optional(),
    category: z.enum(['P', 'I', 'G']),
  })
  .refine((data) => !(data.users && data.role), {
    message: "You can only specify either 'users' or 'role', not both",
    path: ['users', 'role'], // Applies to both fields
  });

export const notificationInfoSchema = z
  .object({
    deviceId: z.string().regex(/^[a-zA-Z0-9_-]/, 'Invalid FCM token format'),
    seenNotification: z
      .string()
      .regex(/^[a-f\d]{24}$/, 'Wrong notification ID')
      .optional(),
  })
  .refine(
    (data) =>
      data.deviceId ||
      (data.seenNotification && data.seenNotification.length > 0),
    {
      message: "'deviceId' or 'seenNotification' is required",
    }
  );

export const notificationValidator = zodSchemaValidator(
  notificationValidationSchema
);
export const notificationInfoValidator = zodSchemaValidator(
  notificationInfoSchema
);
