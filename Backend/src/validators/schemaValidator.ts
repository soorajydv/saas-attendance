import { NextFunction, Request, Response } from 'express';
import { sendBadRequest } from '../utils/responseUtil';
import { z } from 'zod';

export const zodSchemaValidator = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => {
        return `${err.path.join('.')} : ${err.message}`; // Flatten path and message
      }) as any;

      return sendBadRequest(res, errorMessages);
    }

    req.body = result.data;
    next();
  };
};

export const zodQueryValidator = (schema: z.ZodType<any, any, any>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      const errors = result.error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }));

      const formattedErrors = errors
        .map((error) => `${error.path}: ${error.message}`)
        .join(', ');

      return sendBadRequest(res, formattedErrors);
    }

    req.query = result.data;
    next();
  };
};