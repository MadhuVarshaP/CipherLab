import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { JobModel } from "../models/Job";
import { ResultModel } from "../models/Result";
import { verifyProof } from "../services/zk.service";

export async function createJobController(
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

    const { workspaceId, datasetId, name, proof } = req.body as {
      workspaceId: string;
      datasetId: string;
      name: string;
      proof?: "valid";
    };

    const proofOk = await verifyProof(workspaceId, proof);
    if (!proofOk) {
      res.status(403).json({ error: "Invalid semaphore proof" });
      return;
    }

    const job = await JobModel.create({
      workspaceId,
      datasetId,
      name,
      status: "pending",
    });

    // Hybrid demo behavior: simulate execution to completion.
    setTimeout(async () => {
      await JobModel.findByIdAndUpdate(job._id, { status: "running" });
    }, 1200);

    setTimeout(async () => {
      await JobModel.findByIdAndUpdate(job._id, { status: "completed" });
      await ResultModel.create({
        workspaceId,
        jobId: job._id,
        output: "Accuracy 92.4% | Loss 0.17 | F1 0.90",
      });
    }, 4200);

    res.status(201).json({ job });
  } catch (error) {
    next(error);
  }
}

export async function listJobsController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const jobs = await JobModel.find({ workspaceId: req.params.workspaceId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ jobs });
  } catch (error) {
    next(error);
  }
}

