import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { JWT_SECRET } from '../config/env.cofig';
import { IUser } from '../models/interfaces/IUser';

interface TokenSignature {
  id: string;
  user:IUser
  role: string;
}

export class Encrypt {
  static async encryptpass(password: string) {
    return bcrypt.hashSync(password, 12);
  }
  static comparepassword(hashPassword: string, password: string) {
    return bcrypt.compareSync(password, hashPassword);
  }

  static generateToken(payload: TokenSignature) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
  }
}
