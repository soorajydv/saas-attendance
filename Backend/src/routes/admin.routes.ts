import express from 'express';
import classRouter from '../module/class/class.routes';
import busRouter from '../module/bus/bus.routes';
import userRouter from '../module/user/users.routes';

const adminRouter = express.Router();

adminRouter.use('/classes',classRouter);
adminRouter.use('/buses',busRouter);
adminRouter.use('/users',userRouter);

export default adminRouter;