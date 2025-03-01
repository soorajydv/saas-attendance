import express from 'express';
import { userController } from './user.controller';
import { queryValidator } from '../../validators/query.validator';
import { validateId } from '../../validators/id.validator';
import { registerValidator } from '../auth/signup.validator';

const userRouter = express.Router();

userRouter.get('',[queryValidator],userController.getAll);
userRouter.get('/:id',[validateId('id','UserId'),queryValidator],userController.getOne);
userRouter.post('',registerValidator,userController.createOne);
userRouter.patch('/:id',[validateId('id','UserId'),registerValidator],userController.updateOne);
userRouter.delete('/:id',userController.deleteOne);

export default userRouter;