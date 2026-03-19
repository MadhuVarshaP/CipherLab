import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";

export function errorMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  logger.error("Unhandled error", error);

  if (error instanceof Error) {
    res.status(500).json({
      error: error.message,
    });
    return;
  }

  res.status(500).json({ error: "Unexpected server error" });
}

