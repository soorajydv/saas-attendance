import { IOrganization } from './IOrganization';
import Organization from './organisation.model';

export const getOrganizationByName = async (name: string) => Organization.findOne({ name: name });

export const createOrganization = async (data: IOrganization) => {
  const organization = await Organization.create({ ...data });
  return organization;
}

export const getOrganizationById = async (id: string) => Organization.findOne({ _id: id, deletedAt: { $exists: false } });

export const getOrganizationByPhoneOrEmail = async (phone:string,email: string) => {
  const organization = await Organization.findOne({ $or:[{phone},{email}], deletedAt: { $exists: false } });
  return organization;
};


export const updateOrganizationById = async (id: string, data: IOrganization) => {
  return await Organization.findOneAndUpdate(
    { _id:id },
    {  ...data  },
    { new: true, runValidators: true }
  )
};

export const getOrganizations = async (
  skip: number,
  limit: number,
  sortBy: -1 | 1,
): Promise<any> => {
  return await Organization.find().sort({ createdAt: sortBy }).limit(limit).skip(skip);
};