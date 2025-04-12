import cors from 'cors';
import morgan from 'morgan';
import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import { BASE_PATH, NODE_ENV } from './config/env.cofig';
import { errorHandler } from './middlewares/errorHandler';
import { apiLimiter } from './middlewares/rateLimiter';
import routes from './routes/index.routes';

export const createServer = (): http.Server => {
  const app = express();

  // ✅ CORS Configuration
  const corsOptions = {
    origin: ['https://mark01-frontend.vercel.app', 'http://localhost:5000'], // Allowed frontend origins
    credentials: true, // Allow cookies and auth headers
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

  // ✅ Apply CORS Middleware
  app.use(cors(corsOptions));

  // ✅ Handle Preflight Requests
  app.options('*', cors(corsOptions));

  // ✅ Built-in Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // ✅ Serve Static Files (if needed)
  app.use(express.static('public'));

  // ✅ Logging
  app.use(morgan('dev'));

  // ✅ Rate Limiter
  app.use('/api', apiLimiter);

  // ✅ Routes
  app.use(BASE_PATH, routes);

  app.set('trust proxy', 1);

  // ✅ Error Handling Middleware
  app.use(errorHandler);

  // ✅ Fallback Error Handler (optional)
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('🔥 Internal Error:', err);

  res.status(500).json({
    message: 'Internal server error',
    error: NODE_ENV !== 'production' ? err.message : undefined
  });
});


  // ✅ Example Test Route (optional)
  app.get('/', (_req: Request, res: Response) => {
    res.send('Welcome to the API');
  });

  // ✅ Create HTTP Server
  const server = http.createServer(app);
  return server;
};
