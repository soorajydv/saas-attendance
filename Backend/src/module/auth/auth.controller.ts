import { Request, Response } from 'express';
import { Encrypt } from '../../helpers/helpers';
import User from '../../models/users';
import { getUserByEmailOrPhone, getUserById } from '../user/user.service';
import { sendBadRequest, sendNotFound } from '../../utils/responseUtil';
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '../../config/env.cofig';

class AuthController {
  login = async (req: Request, res: Response): Promise<any> => {
    try {
      const { email, password } = req.body;

      const user = (await getUserByEmailOrPhone(email)) as any;
      if (!user) {
        return sendNotFound(res, 'User doesnot exist');
      }
      const isPasswordValid = Encrypt.comparepassword(user.password, password);
      if (isPasswordValid == false) {
        return sendBadRequest(res, 'Invalid password');
      }

      const token = Encrypt.generateToken({
        id: user.id,
        role: user.role,
        user: user,
      });
      res.cookie("token", token, {
        httpOnly: true, // Prevent JavaScript access
        secure: true,   // Ensures it's sent over HTTPS
        sameSite: "strict", // Prevents CSRF
        maxAge: 3600000, // 1 hour
      });
      const role = user.role;
      user.isLogin = true;
      user.isVerified = true;
      user.save();
      console.log(`Logged in as ${role}`);
      
      return res.status(200).json({ message: `Loged in as ${role}`, token, role });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  signup = async (req: Request, res: Response): Promise<any> => {
    try {
      const { ...data } = req.body;

      const role = data.role || 'STUDENT';
      const existingUser = await getUserByEmailOrPhone(data.email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const encryPassword = await Encrypt.encryptpass(data.password);

      const user = await User.create({
        ...data,
        password: encryPassword,
        role,
      });

      return res.status(201).json({
        message: 'User created successfully',
        user,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  logout = async (_req: Request, res: Response): Promise<any> => {
    try {
      res.clearCookie("token");
      console.log("cookie cleared & loggedout");
      
      return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  getUserProfile = async (req: Request, res: Response) => {
    try {
      const token = req.cookies.token; // Extract token from cookie
      if (!token) return res.status(401).json({ message: "Unauthorized" });

      // Verify JWT Token
      const decoded: any = jwt.verify(token, JWT_SECRET);
      const user = await getUserById(decoded.id);

      if (!user) return res.status(404).json({ message: "User not found" });

      return res.json({ role: user.role });
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}

export const authController = new AuthController();
