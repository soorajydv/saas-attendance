import { Server } from 'socket.io';
import { createServer } from './app';
import { connectDB } from './config/database';
import { NODE_ENV, PORT } from './config/env.cofig';

const server = createServer();

// Attach Socket.io
export const io = new Server(server, {
  cors: {
    origin: ['https://mark01-frontend.vercel.app', 'http://localhost:5000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  },
});

// MongoDB connect
connectDB().then(() => {
  // ✅ Only start listening if not already started
  if (NODE_ENV !== 'production') {
    server.listen(PORT, () => {
      console.log(`🚀 Server running in ${NODE_ENV} mode on port ${PORT}`);
      console.log(`🔗 http://localhost:${PORT}`);
    });
  }
});

export default server;
