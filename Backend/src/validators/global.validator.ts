import { z } from "zod";

export const phoneNumberSchema = z
  .string()
  .regex(/^\+?[1-9]\d{1,3}\d{4,14}$/, {
    message:
      "Phone number must be in the format: +<country_code><number> (e.g., +919876543210).",
  });

export const addressSchema = z.object({
    city: z
      .string()
      .min(1, "City is required")
      .regex(/^[A-Za-z\s]+$/, "City can only contain letters and spaces"),
  
    street: z
      .string()
      .regex(/^[A-Za-z0-9\s,]+$/, "Street can only contain letters, numbers, spaces, and commas")
      .optional(),
  
    district: z
      .string()
      .regex(/^[A-Za-z\s]+$/, "District can only contain letters and spaces")
      .optional(),
  
    state: z
      .string()
      .min(1, "State is required")
      .regex(/^[A-Za-z\s]+$/, "State can only contain letters and spaces"),
  
    country: z
      .string()
      .min(1, "Country is required")
      .regex(/^[A-Za-z\s]+$/, "Country can only contain letters and spaces"),
  
    zipCode: z
      .string()
      .regex(/^\d{5}(-\d{4})?$/, "Zip code must be a valid postal code format")
      .optional(), // ZipCode is optional
  });

