import { Server } from 'socket.io';
import { createServer } from './app';
import { connectDB } from './config/database';
import { NODE_ENV, PORT } from './config/env.cofig';
import handleSocketConnections from './socket/socket';

const server = createServer();
export const io = new Server(server);
handleSocketConnections(io);

// Connect to MongoDB
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  });
});

export default server;
