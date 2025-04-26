import { authenticate, authorize } from '../../middlewares/auth.middleware';
import express from 'express';
import { UserRole } from '../../models/enums';
import { loginValidator, registerValidator, resetPasswordValidator } from './auth.validator';
import { authController } from './auth.controller';
import { userController } from '../user/user.controller';

const authRouter = express.Router();

authRouter.post('/register', [authenticate,authorize(UserRole.ADMIN),registerValidator], userController.createOne);
authRouter.post('/login', loginValidator, authController.login);
authRouter.post('/logout', authController.logout);
authRouter.post('/forgot-password', authController.forgotPassword);
authRouter.post('/reset-password', [resetPasswordValidator],authController.resetPassword);
authRouter.get('/me',authController.getUserProfile)

export default authRouter;
