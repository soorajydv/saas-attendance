import cors from 'cors';
import morgan from 'morgan';
import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import { BASE_PATH } from './config/env.cofig';
import { errorHandler } from './middlewares/errorHandler';
import { apiLimiter } from './middlewares/rateLimiter';
import routes from './routes/index.routes';
export const createServer = (): http.Server => {
  const app = express();

  // CORS Configuration
  const corsOptions = {
    origin: '*', // Frontend URL
    credentials: true, // Allow credentials (cookies)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  };

  // Apply CORS middleware
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Serve static files (e.g., CSS)
  app.use(express.static('public'));

  // Error handling middleware (optional)
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  });

  // Logging middleware
  app.use(morgan('dev'));

  // app.use((req, res, next) => {
  //   const start = Date.now();
  //   // Capture the response status and log after the response is finished
  //   res.on('finish', () => {
  //     const duration = Date.now() - start;

  //     // Define status code descriptions
  //     // let statusColor;
  //     let statusDescription = '';
      
  //     // if (res.statusCode >= 500) {
  //     //   statusColor = chalk.red; // Server error (500-599)
  //     //   statusDescription = 'Internal Server Error';
  //     // } else if (res.statusCode >= 400) {
  //     //   statusColor = chalk.yellow; // Client error (400-499)
  //     //   statusDescription = 'Client Error';
  //     // } else if (res.statusCode >= 300) {
  //     //   statusColor = chalk.cyan; // Redirection (300-399)
  //     //   statusDescription = 'Redirection';
  //     // } else if (res.statusCode >= 200) {
  //     //   statusColor = chalk.green; // Success (200-299)
  //     //   statusDescription = 'Success';
  //     // } else {
  //     //   statusColor = chalk.white; // Default for other cases (informational)
  //     //   statusDescription = 'Informational Response';
  //     // }

  //     // Log the request details along with the colored status code and description
  //     console.log(
  //       `${req.method} ${req.originalUrl} ${res.statusCode} - ${statusDescription} - ${duration}ms`
  //     );
  //   });

  //   next();
  // });

  // Rate limiter middleware
  app.use('/api', apiLimiter);

  //  API routes Versioning
  app.use(BASE_PATH, routes);

  app.use(errorHandler);

  // Config Socket
  const server = http.createServer(app);
  return server;
};
