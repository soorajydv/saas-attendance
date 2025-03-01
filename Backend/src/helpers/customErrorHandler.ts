export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode || 500;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends CustomError {
  constructor(message?: string) {
    super(message || "Validation failed", 400);
  }
}

export class NotFoundError extends CustomError {
  constructor(resource = "Resource") {
    super(`${resource} not found`, 404);
  }
}

export class ConflictError extends CustomError {
  constructor(resource = "Duplicate") {
    super(`${resource}`, 409);
  }
}

export class UnAuthorizedError extends CustomError {
  constructor(resource = "Unauthorized") {
    super(`${resource}`, 401);
  }
}

export class ForbiddenError extends CustomError {
  constructor(resource = "Forbidden") {
    super(`${resource}`, 403);
  }
}
