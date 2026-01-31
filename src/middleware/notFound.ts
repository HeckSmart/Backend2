import { Request, Response, NextFunction } from 'express';

/**
 * 404 handler for unmatched routes.
 */
export function notFound(
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  res.status(404).json({
    success: false,
    error: { message: `Not Found: ${req.method} ${req.originalUrl}` },
  });
}
