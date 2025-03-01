import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.cofig';
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from '../config/constant';
import { IUser } from '../models/interfaces/IUser';

interface UserDataInToken extends JwtPayload {
  // Must be Public Data
  _id: string | unknown;
}

// Generate JWT token
export const generateJWT = (user: IUser, isRefresh = false): string => {
  const userData: UserDataInToken = {
    _id: user._id,
  };

  const expiresIn = isRefresh
    ? REFRESH_TOKEN_EXPIRES_IN
    : ACCESS_TOKEN_EXPIRES_IN;
  return jwt.sign(userData, JWT_SECRET, { expiresIn });
};

export const verifyJWT = (token: string) => {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded;
};
