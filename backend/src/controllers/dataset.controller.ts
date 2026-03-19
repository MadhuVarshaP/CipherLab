import crypto from "crypto";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { DatasetModel } from "../models/Dataset";
import { verifyProof } from "../services/zk.service";

export async function uploadDatasetController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { workspaceId, name, owner, metadata, proof } = req.body as {
      workspaceId: string;
      name: string;
      owner: string;
      metadata?: { size?: string; category?: string };
      proof?: "valid";
    };

    const proofOk = await verifyProof(workspaceId, proof);
    if (!proofOk) {
      res.status(403).json({ error: "Invalid semaphore proof" });
      return;
    }

    const hash = "0x" + crypto.createHash("sha256").update(name + Date.now()).digest("hex");
    const dataset = await DatasetModel.create({
      workspaceId,
      name,
      owner,
      hash,
      metadata: {
        size: metadata?.size ?? "2.4 MB",
        category: metadata?.category ?? "General",
      },
    });

    res.status(201).json({ dataset });
  } catch (error) {
    next(error);
  }
}

export async function listDatasetsController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const datasets = await DatasetModel.find({ workspaceId: req.params.workspaceId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ datasets });
  } catch (error) {
    next(error);
  }
}

