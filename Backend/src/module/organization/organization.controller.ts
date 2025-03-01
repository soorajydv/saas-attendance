
import { Request, Response } from 'express';
import { sendConflict, sendBadRequest, sendCreated, sendNotFound, sendSuccess, sendFound } from '../../utils/responseUtil';
import { getOrganizationByPhoneOrEmail, createOrganization, getOrganizationById, updateOrganizationById, getOrganizations } from './organization.service';
import { Encrypt } from '../../helpers/helpers';
import { getUserByEmailOrPhone, createUser } from '../user/user.service';

//Create organization
export const createOne = async (req: Request, res: Response) => {
  const organization = await getOrganizationByPhoneOrEmail(req.body.phone,req.body.email);
  if (organization) return sendConflict(res, 'Email or phone already exists');
  const newOrganization = await createOrganization(req.body);
  if (!newOrganization) return sendBadRequest(res, 'Failed to create organization');
  return sendCreated(res, 'Organization created', newOrganization)
};

//create admin of particular organization id (orgId in req.body)
export const createAdmin = async (req:Request, res:Response) => {
  req.body.role = "ADMIN";
  const { ...data} = req.body;
  data.password = await Encrypt.encryptpass(data.password);
  const user = await getUserByEmailOrPhone(data.email,data.phoneNumber);
  if(user) return sendConflict(res,'Email or phone already exists');
  const organization = await getOrganizationById(data.organizationId);
  if(!organization) return sendNotFound(res, 'Organization not found');
  const admin = await createUser(data);
  return sendCreated(res, 'Admin created', admin);
}

//update organization
export const updateOne = async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const existingOrganization = await getOrganizationById(req.params.id);
  if (!existingOrganization) return sendNotFound(res, "Organization not found.");
  const updatedOrganization = await updateOrganizationById(req.params.id, data);
  if (!updatedOrganization) return sendBadRequest(res, "Failed to update organization.");
  return sendSuccess(res, "Organization updated successfully.", updatedOrganization);
};

export const deleteOne = async (req: Request, res: Response) => {
  const organization = await getOrganizationById(req.params.id);
  if (!organization) return sendNotFound(res, 'Organization not found');
  await organization.delete();
  return sendSuccess(res, 'Organization deleted')
}

export const getOne = async (req: Request, res: Response) => {
  const organization = await getOrganizationById(req.params.id);
  if (!organization) return sendNotFound(res, 'Organization not found');
  return sendFound(res, 'Organization found', organization);
}

export const getAll = async (req: Request, res: Response) => {
  const { limit = 5, page = 1, sort = 'asc' } = req.query;
  const pageNumber = Number(page);
  const pageSize = Number(limit);
  const skip = (pageNumber - 1) * pageSize;
  const sortOrder = sort === 'desc' ? -1 : 1;
  const organizations = await getOrganizations(skip,pageSize,sortOrder);
  if (organizations.length == 0) return sendNotFound(res, 'No organizations found');
  return sendSuccess(res, 'Organizations found', organizations);
}