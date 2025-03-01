import { z } from 'zod';
import { SubscriptionPlan } from '../../models/enums';
import { addressSchema, phoneNumberSchema } from '../../validators/global.validator';
import { zodSchemaValidator } from '../../validators/schemaValidator';

// Attendance settings schema
const attendanceSettingsSchema = z.object({
  enableNotifications: z.boolean().optional(),
  attendanceThreshold: z.number().min(0).max(100).optional(),
  gracePeriod: z.number().min(0).optional(),
});

// Billing info schema
const billingInfoSchema = z.object({
  billingName: z.string().min(1, { message: 'Name is required.' })
    .max(100, { message: 'Name must be less than 100 characters.' }),
  billingPhone: phoneNumberSchema,
  billingEmail: z.string().email(),
  creditCardNumber: z.string().regex(/^\d{16}$/, 'Invalid credit card number').optional(),
  creditCardExpiry: z.string().regex(/^\d{2}\/\d{2}$/, 'Invalid expiry format (MM/YY)').optional(),
  creditCardCVV: z.string().regex(/^\d{3}$/, 'Invalid CVV').optional(),
});

// Function to check for repeated words
function hasRepeatedWords(name: string): boolean {
  const words = name.split(/\s+/); // Split by spaces
  const uniqueWords = new Set(words); // Remove duplicates
  return words.length !== uniqueWords.size; // If the length is different, there are repeated words
}

const createOrganizationSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Organization name is required.' }) // Must not be empty
    .max(30, {
      message: 'Organization name must be less than 30 characters.',
    }) // Maximum length of 100 characters
    .regex(/^[a-zA-Z0-9 .&'-]+$/, {
      message:
        "Organization name can only contain letters, numbers, spaces, and special characters ('.', '-', '&').",
    }) // Valid characters
    .refine((val) => !hasRepeatedWords(val), {
      message: 'Organization name cannot contain repeated words.',
    }),
  email: z.string().email(),
  phone: phoneNumberSchema,
  logoUrl: z.string().url().optional(),
  organizationType: z.string(), //"School", "University", "Corporate"
  address: addressSchema,
});

// Organization update schema
const updateOrganizationSchema = z.object({
  name: createOrganizationSchema.shape.name.optional(),
  email: z.string().email().optional(),
  phone: phoneNumberSchema.optional(),
  logoUrl: z.string().url().optional(),
  address: addressSchema.optional(),
  organizationType: z.string().regex(/^\w+$/, 
    { message: 'Organization type must be a single word.' }).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'PENDING']),
  subscriptionPlan: z.enum(Object.values(SubscriptionPlan) as [string, ...string[]]),
  subscriptionExpiry: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Expected YYYY-MM-DD').optional(),
  isActive: z.boolean().optional(),
  adminId: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid ObjectId').optional(),
  attendanceSettings: attendanceSettingsSchema.optional(),
  billingInfo: billingInfoSchema.optional(),
  timezone: z.string().optional(),
  language: z.string().optional(),
});

export const createOrganizationValidator = zodSchemaValidator( createOrganizationSchema );
export const updateOrganizationValidator = zodSchemaValidator( updateOrganizationSchema );
