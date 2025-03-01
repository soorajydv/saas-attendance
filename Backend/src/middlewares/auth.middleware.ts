import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.cofig';
import {
  sendBadRequest,
  sendForbidden,
  sendNotFound,
  sendUnauthorized,
} from '../utils/responseUtil';
import { IUser } from '../models/interfaces/IUser';
import { getUserById } from '../module/user/user.service';
import { UserRole } from '../models/enums';

export interface AuthRequest extends Request {
  userId?: any;
  user?: IUser;
  role?: UserRole;
  decoded?: any;
  organizationId?: any;
}

export const authenticate = asyncHandler(
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer token
    if (!token) return sendUnauthorized(res, 'No token provided');

    jwt.verify(token, JWT_SECRET, async (err, decoded: any) => {
      if (err) return sendUnauthorized(res, 'Invalid or Expired token');

      if (!decoded) return sendBadRequest(res, 'Invalid token');

      // console.log('Typesof: ', decoded._id);

      // Check if token expired
      // const currentTime = Math.floor(Date.now() / 1000);
      // if (decoded.exp < currentTime)
      //   return sendBadRequest(res, 'Token is expired');

      req.userId = decoded.id;
      req.role = decoded.role;
      req.organizationId = decoded.organizationId;
      req.decoded = decoded;
      
      const user = await getUserById(decoded.id);
      if (!user)
        return sendForbidden(res, "User doesn't exists. Please relogin");

      if (!user.isVerified)
        return sendForbidden(
          res,
          'User must be verified to access the resource'
        );

      if (!user.isLogin) return sendForbidden(res, 'User is logged out');

      if (user.deletedAt) return sendNotFound(res, 'User not found');

      req.user = user;

      next();
    });
  }
);

export const authorize = (allowedRole: UserRole) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if(! user) return sendUnauthorized(res, 'Unauthorized');

    if (user.role !== allowedRole) {
      return sendForbidden(res, `Access denied for role=${user.role}`);
    }
    next();
  };
};
