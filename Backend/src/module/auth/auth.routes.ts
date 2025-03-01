import { authenticate, authorize } from '../../middlewares/auth.middleware';
import express from 'express';
import { UserRole } from '../../models/enums';
import loginValidator from './login.validator';
import { registerValidator } from './signup.validator';
import { authController } from './auth.controller';
import { userController } from '../user/user.controller';

const authRouter = express.Router();

authRouter.post('/register', [authenticate,authorize(UserRole.ADMIN),registerValidator], userController.createOne);
authRouter.post('/login', loginValidator, authController.login);
authRouter.post('/logout', authController.logout);
authRouter.get('/me',authController.getUserProfile)

export default authRouter;
