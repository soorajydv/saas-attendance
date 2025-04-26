import { z } from 'zod';
import { zodSchemaValidator } from '../../validators/schemaValidator';

export const studentAttendanceSchema = z.object({
    studentId: z
        .string()
        .regex(/^[a-fA-F0-9]{24}$/, { message: 'Invalid studentId format' }),
    period: z.number().min(1, { message: 'Period must be at least 1' }),
});

export const studentAttendanceValidator = zodSchemaValidator(studentAttendanceSchema);