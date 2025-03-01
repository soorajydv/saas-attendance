import { z } from "zod";
import { zodSchemaValidator } from "../../validators/schemaValidator";
import { Section } from "./IClass";

// Period Schema
const periodSchema = z.object({
    period: z.number().int().min(1, "Period must be a positive integer."),
    subject: z.string().min(1, "Subject is required."),
    teacherId: z.string().regex(/^[a-f\d]{24}$/i, "Invalid teacher ID format").optional()
  });

const classValidationSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required.")
        .regex(/^[A-Z]+( [A-Z]+)?$/, "Name should be in uppercase."),
    section: z.nativeEnum(Section, {
        message: "Invalid section. Please choose a valid section (A to Z)"
      }),
    
    periods: periodSchema.array().optional(),
});

export const classValidator = zodSchemaValidator(classValidationSchema);