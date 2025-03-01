import { UserRole } from '../../models/enums';
import { IUser } from '../../models/interfaces/IUser';
import { ActiveUsers } from '../model/activeUsers';
export const activeUsers = new ActiveUsers();

export const handleUserConnectionEvent = async (
  user: IUser,
  socketId: string
): Promise<void> => {
  const { isRoleEmployee, isRoleAdmin, isRoleStudent, userId } = _getUserData(user);

  if (isRoleEmployee) {
    activeUsers.joinEmployee(userId, socketId);
    console.log(`Driver ${userId} joined`);
  } else if (isRoleStudent) {
    activeUsers.joinStudent(userId, socketId);
    console.log(`Passenger ${userId} joined`);
  } else if (isRoleAdmin) {
    activeUsers.joinAdmin(userId, socketId);
    console.log(`Admin ${userId} joined`);
  }
};

export const handleUserDisconnectEvent = async (
  user: IUser
): Promise<void> => {
  const { isRoleEmployee, isRoleAdmin, isRoleStudent, userId } = _getUserData(user);

  if (isRoleEmployee) {
    activeUsers.removeEmployee(userId);
    console.log(`Employee ${userId} disconnected`);
  } else if (isRoleStudent) {
    activeUsers.removeStudent(userId);
    console.log(`Student ${userId} disconnected`);
  } else if(isRoleAdmin) {
    activeUsers.removeAdmin(userId);
    console.log(`Admin ${userId} disconnected`);
  }
};

const _getUserData = (user: IUser) => {
  const isRoleEmployee = user.role == UserRole.EMPLOYEE;
  const isRoleAdmin = user.role === UserRole.ADMIN;
  const isRoleStudent = user.role === UserRole.STUDENT;
  const userId = user.id;
  // TODO: Handle Super Admins
  return { isRoleEmployee, isRoleAdmin, isRoleStudent, userId };
};
