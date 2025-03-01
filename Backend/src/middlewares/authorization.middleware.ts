// // backend/middlewares/authMiddleware.ts

// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { UserModel } from '../features/auth/models/user.model';
// import { JWT_SECRET } from '../config/env.cofig';

// // Middleware to check if user is authenticated as a Passenger
// export const isPassengerAuthenticated = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.headers['authorization'];
//   if (!token) return res.status(401).send('Access denied.');

//   jwt.verify(
//     token,JWT_SECRET as string,
//     (err, user: UserModel | undefined) => {
//       if (err) return res.status(403).send('Invalid token.');
//       if (!user || user.role !== 'passenger')
//         return res.status(403).send('Not authorized as a passenger.');
//       req.user = user;
//       next();
//     }
//   );
// };

// // Middleware to check if user is authenticated as a Driver
// export const isDriverAuthenticated = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.headers['authorization'];
//   if (!token) return res.status(401).send('Access denied.');

//   jwt.verify(
//     token,JWT_SECRET,
//     (err, user: UserModel | undefined) => {
//       if (err) return res.status(403).send('Invalid token.');
//       if (!user || user.role !== 'driver')
//         return res.status(403).send('Not authorized as a driver.');
//       req.user = user;
//       next();
//     }
//   );
// };

// // Middleware to check if user is authenticated as an Admin
// export const isAdminAuthenticated = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.headers['authorization'];
//   if (!token) return res.status(401).send('Access denied.');

//   jwt.verify(
//     token,
//     process.env.JWT_SECRET as string,
//     (err, user: User | undefined) => {
//       if (err) return res.status(403).send('Invalid token.');
//       if (!user || user.role !== 'admin')
//         return res.status(403).send('Not authorized as an admin.');
//       req.user = user;
//       next();
//     }
//   );
// };
