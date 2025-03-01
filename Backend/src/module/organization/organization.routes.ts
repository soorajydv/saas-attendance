import express from 'express';
import { authenticate, authorize } from '../../middlewares/auth.middleware';
import { UserRole } from '../../models/enums';
import { validateId } from '../../validators/id.validator';
import { createAdmin, createOne, deleteOne, getAll, getOne, updateOne } from './organization.controller';
import { adminRegisterValidator } from '../auth/signup.validator';
import { createOrganizationValidator, updateOrganizationValidator } from './organization.validator';
import { userController } from '../user/user.controller';
import { queryValidator } from '../../validators/query.validator';

const suRouter = express.Router();

//create admin of particular organization
suRouter.post('/admins/register', [authenticate, authorize(UserRole.SU), adminRegisterValidator], createAdmin);

suRouter.get('/organizations', [authenticate, authorize(UserRole.SU)], getAll);
suRouter.get('/organizations/:id', [authenticate, authorize(UserRole.SU), validateId('id', 'OrganizationId')], getOne);
suRouter.post('/organizations', [authenticate, authorize(UserRole.SU), createOrganizationValidator], createOne);
suRouter.patch('/organizations/:id', [authenticate, authorize(UserRole.SU), validateId('id', 'OrganizationId'), updateOrganizationValidator], updateOne);
suRouter.delete('/organizations/:id', [authenticate, authorize(UserRole.SU), validateId('id', 'OrganizationId')], deleteOne);

suRouter.get('/users', [authenticate, authorize(UserRole.SU), queryValidator], userController.getAllAdmins);
export default suRouter;