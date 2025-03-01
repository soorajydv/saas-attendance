import express from 'express';
import { authorize } from '../../middlewares/auth.middleware';
import { UserRole } from '../../models/enums';
import { classValidator } from './class.validator';
import { validateId } from '../../validators/id.validator';
import { queryValidator } from '../../validators/query.validator';
import { createOne, getOne, updateOne, deleteOne, getAll } from './class.controller';

const classRouter = express.Router();

classRouter.post('/class',[authorize(UserRole.ADMIN),classValidator],createOne);
classRouter.get('/class/:id',validateId('id','ClassId'),getOne);
classRouter.patch('/class/:id',[authorize(UserRole.ADMIN),validateId('id','ClassId'),classValidator],updateOne);
classRouter.delete('/class/:id',[authorize(UserRole.ADMIN),validateId('id','ClassId')],deleteOne);
classRouter.get('/class',queryValidator,getAll);

export default classRouter;