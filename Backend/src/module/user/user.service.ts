import { IUser } from '../../models/interfaces/IUser';
import User from '../../models/users';

export const getUserById = async (_id: string) => {
  const user = await User.findById(_id)
  return user;
};

export const getUsersByIds = async (ids: string[]) => User.find({_id:{$in: ids}});

export const getUserByEmailOrPhone = async (email: string,number?:number) => 
  User.findOne({$or:[{email:email},{phoneNumber:number}]})


export const createUser =  async (user: IUser) => User.create(user);

export const updateUserById = async(id:string,data:Partial<IUser>) => {
  const user = User.findByIdAndUpdate(id,{...data});
  return user;
}

export const getUsersByOrganizationId = async(
  organizationId:string,
  pageNumber: number,
  pageSize: number,
  sortOrder: -1 | 1,
) => User.find({organizationId})
  .skip((pageNumber - 1) * pageSize) // Skip the records for pagination
  .limit(pageSize) // Limit the number of records returned
  .sort({ createdAt: sortOrder });

export const getAdmins = async (
  pageNumber: number,
  pageSize: number,
  sortOrder: -1 | 1
) => {
  return await User.aggregate([
    { $match: { role: "ADMIN", deleted: false } }, // Filter admins only
    {
      $lookup: {
        from: "organizations", // The MongoDB collection name (must match DB collection name)
        localField: "organizationId", // The field in the User model
        foreignField: "_id", // The primary key in the Organization model
        as: "organization", // The result will be stored in this field
      },
    },
    { $unwind: "$organization" }, // Convert array result to a single object
    {
      $project: {
        _id: 1,
        fullName: 1,
        email: 1,
        role: 1,
        createdAt: 1,
        "organization.name": 1, // Only include the organization name
      },
    },
  ]).sort({ createdAt: sortOrder }).limit(pageSize).skip((pageNumber - 1) * pageSize);;
};