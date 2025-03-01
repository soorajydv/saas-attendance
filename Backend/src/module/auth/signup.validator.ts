import { z } from 'zod';
import { emailSchema, passwordSchema } from './login.validator';
import { zodSchemaValidator } from '../../validators/schemaValidator';

// Calculate the minimum date for 16 years of age
const _today = new Date();
const _minDate = new Date(
  _today.getFullYear() - 4,
  _today.getMonth(),
  _today.getDate()
);

const fullNameSchema = z
  .string()
  .trim()
  .min(5, { message: '"fullName" must be at least 5 characters long' })
  .max(50, { message: '"fullName" must be at most 50 characters long' })

  .refine((value) => /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(value), {
    message:
      '"fullName" must contain only letters and spaces, no numbers or special characters',
  })
  .refine((value) => !/(.)\1\1/.test(value), {
    message: '"fullName" must not contain consecutive duplicate characters',
  });

const dateOfBirthSchema = z
  .string()
  .date("Invalid date provided or format don't follow YYYY-MM-DD")
  .refine((dob) => /^\d{4}-\d{1,2}-\d{1,2}$/.test(dob), {
    message: 'DOB must be in YYYY-MM-DD format.',
  })
  .refine((dob) => !/[!@#$%^&*()_+=[\]{};':"\\|,.<>?`~]/.test(dob), {
    message: 'DOB contains illegal characters.',
  })
  .refine(
    (dob) => {
      const date = new Date(dob);
      return !isNaN(date.getTime());
    },
    {
      message: 'DOB is not a valid date.',
    }
  )
  .transform((dob) => new Date(dob)) // Transform to Date object
  .refine((date) => date <= _minDate, {
    message: 'Age must be at least 4 years.',
  });

const phoneNumberSchema = z
  .string()
  .length(10, { message: 'Phone number must be exactly 10 digits long' })
  .regex(/^\d+$/, { message: 'Phone number must contain only numeric digits' });

const genderSchema = z.enum(['MALE', 'FEMALE', 'OTHERS'], {
  errorMap: () => ({
    message: 'Gender must be one of "MALE", "FEMALE", or "OTHERS"',
  }),
});

const registerSchema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  password: passwordSchema,
  dateOfBirth: dateOfBirthSchema,
  phoneNumber: phoneNumberSchema,
  gender: genderSchema,
  role: z.enum(['STUDENT', 'TEACHER', 'ADMIN'], {
    errorMap: () => ({
      message: 'Role must be one of "STUDENT" or "TEACHER" or "ADMIN"',
    }),
  }),
  busId:z.string().regex(/^[a-fA-F0-9]{24}$/, { message: "Invalid BusId" }).optional(),
});

const adminRegisterSchema = registerSchema.extend({
  organizationId: z.string().regex(/^[a-fA-F0-9]{24}$/, {
    message:
      'Invalid organization Id',
  }),
});

export const registerValidator = zodSchemaValidator(registerSchema);
export const adminRegisterValidator = zodSchemaValidator(adminRegisterSchema);
