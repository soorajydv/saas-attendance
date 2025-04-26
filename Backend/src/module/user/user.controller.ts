import { Request, Response } from "express";
import { Encrypt } from "../../helpers/helpers";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { sendConflict, sendBadRequest, sendCreated, sendNotFound, sendUnauthorized, sendSuccess, sendFound } from "../../utils/responseUtil";
import { getUserByEmailOrPhone, createUser, getUserById, updateUserById, getUsersByOrganizationId, getAdmins, getAllUsers } from "./user.service";
import User from "../../models/users";

class UserController {
  createOne = async (req: AuthRequest, res: Response) => {
    const { ...data } = req.body;
    const existingUser = await getUserByEmailOrPhone(data.email, data.phoneNumber);
    if (existingUser) {
      return sendConflict(res, 'Email or phoneNumber already exists');
    }
    data.password = await Encrypt.encryptpass(data.password);
    data.organizationId = req.user?.organizationId;

    const user = await createUser(data);
    if (!user) return sendBadRequest(res, 'Failed to create user');
    return sendCreated(res, 'User created successfully', user);
  };

  getOne = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) return sendNotFound(res, 'User not found');
    return sendFound(res, 'User found', user);
  }

  updateOne = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { ...data } = req.body;
    const user = await getUserById(id);
    if (!user) return sendNotFound(res, 'User not found');
    if (user.organizationId !== req.user?.organizationId) {
      return sendUnauthorized(res, 'You are not allowed to update this user');
    }
    const updatedUser = await updateUserById(id, data);
    if (!updatedUser) sendBadRequest(res, 'Failed to update user');
    return sendSuccess(res, 'User updated', updatedUser);
  };

  deleteOne = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) return sendNotFound(res, 'User not found');
    const deleted = await user.delete();
    if (!deleted) return sendBadRequest(res, 'Failed to delete user');
    return sendSuccess(res, 'User deleted');
  }

  getAll = async (req: AuthRequest, res: Response) => {
    const { limit = 5, page = 1, sort = 'asc' } = req.query;
    const pageNumber = Number(page);
    const pageSize = Number(limit);
    const skip = (pageNumber - 1) * pageSize;
    const sortOrder = sort === 'desc' ? -1 : 1;

    if (!req.user || !req.user.organizationId) {
      return sendBadRequest(res, "Organization ID is missing in user data");
    }

    const organizationId = req.user.organizationId.toString();

    // Get total user count
    const totalUsers = await User.countDocuments({ organizationId });

    if (totalUsers === 0) {
      return sendNotFound(res, "No users found");
    }

    // Calculate total pages
    const totalPages = Math.ceil(totalUsers / pageSize);

    // Fetch paginated users
    const users = await getUsersByOrganizationId(organizationId, pageSize, skip, sortOrder);

    return sendFound(res, "Users found", {
      users,
      totalPages,
      currentPage: pageNumber,
      totalUsers,
    });
  };


  getAllAdmins = async (req: Request, res: Response) => {
    const { limit, page, sort = 'asc' } = req.query;
    const pageNumber = Number(page) || 1; // Ensure default page 1
    const pageSize = Math.max(1, Number(limit) || 10); // Ensure positive limit
    const sortOrder = sort === 'desc' ? -1 : 1;
    const users = await getAdmins(pageNumber, pageSize, sortOrder); // Fixed function call
    if (users.length === 0) return sendNotFound(res, 'No admins found');
    return sendSuccess(res, 'Admins found', users);
  };

}

export const getAllUsersForSuperAdmin = async (req: Request, res: Response) => {
  const { limit = 5, page = 1, sort = 'asc' } = req.query;
  const pageNumber = Number(page);
  const pageSize = Number(limit);
  const skip = (pageNumber - 1) * pageSize;
  const sortOrder = sort === 'desc' ? -1 : 1;
  const users = await getAllUsers(skip, pageSize, sortOrder);
  return sendFound(res, "Users found", { users, totalPages: Math.ceil(users.length / pageSize), currentPage: pageNumber });
  };

export const userController = new UserController();