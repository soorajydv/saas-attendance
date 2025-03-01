import jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { JWT_SECRET } from '../../config/env.cofig';

interface AuthenticatedSocket extends Socket {
  user?: { userId: string };
}

function extractToken(authHeader: string): string | null {
  // Split the string by space and return the second part (the token)
  const parts = authHeader.split(' ');

  // Check if the string is in the correct format
  if (parts.length === 2 && parts[0] === 'Bearer') {
    return parts[1]; // Return the token
  }

  // Return null if the format is invalid
  return null;
}

export const authenticateSocket = (socket: AuthenticatedSocket, next: any) => {
  const query = socket.handshake.query;

  if (!query.token) return next(new Error('NoTokenProvided'));
  const token = extractToken(query.token as string);
  if (!token) {
    const error = new Error('InvalidTokenFormat'); // If token is invalid, send error
    return next(error); // Reject connection with the error
  }

  jwt.verify(token, JWT_SECRET, function (err: any, decoded: any) {
    if (err || !decoded) {
      return next(new Error('TokenDecodeFailed'));
    }

    socket.user = { userId: decoded.id };
    
    next();
  });
};
