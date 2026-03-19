import { Request, Response, NextFunction } from "express";
import { ResultModel } from "../models/Result";

export async function listResultsController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const results = await ResultModel.find({ workspaceId: req.params.workspaceId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ results });
  } catch (error) {
    next(error);
  }
}

