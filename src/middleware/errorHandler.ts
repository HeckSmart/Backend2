import { Request, Response, NextFunction } from 'express';
import config from '../config';

/** Error with HTTP status for API responses */
export class AppError extends Error {
  statusCode: number;
  errors?: unknown[];

  constructor(message: string, statusCode = 500, errors?: unknown[]) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    Object.setPrototypeOf(this, AppError.prototype);
    this.name = 'AppError';
  }
}

interface HttpError extends Error {
  statusCode?: number;
  status?: number;
  errors?: unknown[];
}

interface NormalizedError {
  statusCode: number;
  message: string;
  errors?: unknown[];
}

function isSequelizeValidationError(err: unknown): err is { name: string; errors?: Array<{ message: string; path?: string }> } {
  const e = err as { name?: string };
  return e?.name === 'SequelizeValidationError' || e?.name === 'SequelizeValidationErrorItem';
}

function isSequelizeUniqueConstraintError(err: unknown): err is { name: string; parent?: { code?: string }; fields?: unknown } {
  const e = err as { name?: string };
  return e?.name === 'SequelizeUniqueConstraintError';
}

function isSequelizeForeignKeyConstraintError(err: unknown): err is { name: string } {
  const e = err as { name?: string };
  return e?.name === 'SequelizeForeignKeyConstraintError';
}

function isSequelizeDatabaseError(err: unknown): err is { name: string; parent?: { code?: string }; message?: string } {
  const e = err as { name?: string };
  return Boolean(
    e?.name === 'SequelizeDatabaseError' || (e?.name && String(e.name).startsWith('Sequelize'))
  );
}

/**
 * Normalize known error types (Sequelize, AppError, etc.) into a consistent shape.
 */
function normalizeError(err: unknown): NormalizedError {
  if (err instanceof AppError) {
    return {
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors,
    };
  }

  const httpErr = err as HttpError;
  if (httpErr?.statusCode != null || httpErr?.status != null) {
    return {
      statusCode: httpErr.statusCode ?? httpErr.status ?? 500,
      message: httpErr.message ?? 'Internal Server Error',
      errors: httpErr.errors,
    };
  }

  if (isSequelizeValidationError(err)) {
    const errors = (err as { errors?: Array<{ message: string; path?: string }> }).errors;
    const messages = errors?.map((e) => e.message) ?? ['Validation failed'];
    return {
      statusCode: 400,
      message: 'Validation failed',
      errors: errors ?? messages,
    };
  }

  if (isSequelizeUniqueConstraintError(err)) {
    return {
      statusCode: 409,
      message: 'A record with this value already exists',
      errors: err.fields ? [err.fields] : undefined,
    };
  }

  if (isSequelizeForeignKeyConstraintError(err)) {
    return {
      statusCode: 400,
      message: 'Invalid reference: linked record may not exist',
    };
  }

  if (isSequelizeDatabaseError(err)) {
    const parent = (err as { parent?: { code?: string } }).parent;
    if (parent?.code === 'ECONNREFUSED' || parent?.code === 'ETIMEDOUT') {
      return { statusCode: 503, message: 'Database temporarily unavailable' };
    }
    return {
      statusCode: 500,
      message: config.isProd ? 'A database error occurred' : (err.message ?? 'Database error'),
    };
  }

  // Express JSON body parse error
  const syntaxErr = err as { type?: string; status?: number; message?: string };
  if (syntaxErr?.type === 'entity.parse.failed' || syntaxErr?.status === 400) {
    return {
      statusCode: 400,
      message: syntaxErr.message ?? 'Invalid JSON in request body',
    };
  }

  const message = err instanceof Error ? err.message : 'Internal Server Error';
  return { statusCode: 500, message };
}

/**
 * Central error handler middleware. Sends consistent JSON responses and hides
 * stack/details in production. Use next(new AppError('Message', 404)) in routes.
 */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const normalized = normalizeError(err);
  const payload: {
    success: false;
    error: { message: string; stack?: string; errors?: unknown[] };
  } = {
    success: false,
    error: {
      message: normalized.message,
      ...(normalized.errors?.length ? { errors: normalized.errors } : {}),
    },
  };

  if (!config.isProd && err instanceof Error && err.stack) {
    payload.error.stack = err.stack;
  }

  if (!res.headersSent) {
    res.status(normalized.statusCode).json(payload);
  }
}
