import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { WorkspaceModel } from "../models/Workspace";
import { createGroup } from "../services/zk.service";
import { createWorkspaceOnChain } from "../services/contract.service";
import { UserModel } from "../models/User";

export async function createWorkspaceController(
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

    const { name, walletAddress } = req.body as {
      name: string;
      walletAddress: string;
    };

    const user = await UserModel.findOne({ walletAddress: walletAddress.toLowerCase() });
    if (!user) {
      res.status(404).json({ error: "User not found. Connect wallet first." });
      return;
    }

    const workspace = await WorkspaceModel.create({
      name,
      members: [
        {
          walletAddress: user.walletAddress,
          anonymousId: user.anonymousId,
          role: "owner",
          identityCommitment: user.identityCommitment,
        },
      ],
      semaphoreGroupId: `group_${Date.now()}`,
    });

    createGroup(workspace._id.toString(), workspace.semaphoreGroupId);
    const txHash = await createWorkspaceOnChain(workspace._id.toString(), name);

    res.status(201).json({ workspace, txHash });
  } catch (error) {
    next(error);
  }
}

export async function getWorkspaceController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const workspace = await WorkspaceModel.findById(req.params.id);
    if (!workspace) {
      res.status(404).json({ error: "Workspace not found" });
      return;
    }
    res.status(200).json({ workspace });
  } catch (error) {
    next(error);
  }
}

