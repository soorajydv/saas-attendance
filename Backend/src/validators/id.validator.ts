import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { sendBadRequest } from '../utils/responseUtil';

// Middleware to validate ObjectId
export const validateId = (paramName: string, name: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const id = req.params[paramName];
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendBadRequest(res, `Invalid ${name}`);
    }
    next();
  };
};
