import { Server, Socket } from 'socket.io';
import { ErrorEvents, LocationEvents, SocketEvents } from './events';
import { authenticateSocket } from './middleware/authenticateSocket';
import { getUserById } from '../module/user/user.service';
import { handleUserConnectionEvent } from './event_handlers/handleActiveUsersEvent';
import { IUser } from '../models/interfaces/IUser';
import { UserRole } from '../models/enums';
import { IBusLocation } from '../models/interfaces/IBusLocation';

interface AuthenticatedSocket extends Socket {
  user?: { userId: string; role: UserRole; organizationId: string };
}

const handleSocketConnections = (io: Server) => {
  io.use(authenticateSocket);

  io.on(SocketEvents.connection, async (socket: AuthenticatedSocket) => {
    if (!socket.user) return new Error('Authentication error');

    const userId = socket.user.userId;
    const user = (await getUserById(userId)) as IUser;
    console.log(user);
    

    await handleUserConnectionEvent(user!, socket.id);

    // Handle bus location updates
    socket.on(LocationEvents.updateLocation, (location: IBusLocation) => {
      if (socket.user?.role === UserRole.EMPLOYEE) {
        // Bus driver sends location updates for their bus
        const busRoom = `${location.busId}`;
        io.to([busRoom, user.organizationId]).emit(LocationEvents.updateLocation,location);
        console.log(`Bus ${location.busId} location updated: `, location);
      } else {
        socket.emit(ErrorEvents.error,'Only bus drivers can send location updates');
      }
    });

    // Admins should join a room to listen to their buses' locations
    if (socket.user?.role === UserRole.ADMIN) {
      // Admin joins the room for all buses within their organization
      socket.on(LocationEvents.joinOrganizationRoom, () => {
        socket.join(`${user.organizationId}`);
        console.log(`Admin ${userId} joined room: organization_${user.organizationId}`);
      });
    }

    socket.on(SocketEvents.disconnect, () => {
      console.log(`User ${userId} disconnected`);
    });
    return;
  });
};

export default handleSocketConnections;