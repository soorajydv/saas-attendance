import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Set default status code if not already set
  const statusCode = err.statusCode || 500;

  //TODO: Log the error details (consider using a logging library in production)
  console.error(err);

  // Send the appropriate response based on error type
  return res.status(statusCode).json({
    status: statusCode === 500 ? "error" : "fail",
    message: err.isOperational ? err.message : "Internal Server Error",
    ...(process.env.NODE_ENV === "production" && { stack: err.stack }), // Include stack trace in development
  });
};
