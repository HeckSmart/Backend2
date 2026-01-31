import { Request, Response, NextFunction } from 'express';
import { testConnection } from '../database';

export async function health(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await testConnection();
    res.status(200).json({
      success: true,
      data: {
        status: 'ok',
        database: 'connected',
        timestamp: new Date().toISOString(),
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function readiness(
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  try {
    await testConnection();
    res.status(200).json({ success: true, ready: true });
  } catch {
    res.status(503).json({ success: false, ready: false });
  }
}
