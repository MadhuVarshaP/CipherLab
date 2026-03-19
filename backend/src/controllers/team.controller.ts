import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { WorkspaceModel } from "../models/Workspace";
import { UserModel } from "../models/User";
import { addMember } from "../services/zk.service";
import { addMemberOnChain } from "../services/contract.service";

export async function addTeamMemberController(
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

    const { workspaceId, walletAddress, role } = req.body as {
      workspaceId: string;
      walletAddress: string;
      role: string;
    };

    const workspace = await WorkspaceModel.findById(workspaceId);
    if (!workspace) {
      res.status(404).json({ error: "Workspace not found" });
      return;
    }

    const user = await UserModel.findOne({ walletAddress: walletAddress.toLowerCase() });
    if (!user) {
      res.status(404).json({ error: "User not found. Connect wallet first." });
      return;
    }

    const exists = workspace.members.some((m) => m.walletAddress === user.walletAddress);
    if (exists) {
      res.status(409).json({ error: "Member already exists" });
      return;
    }

    workspace.members.push({
      walletAddress: user.walletAddress,
      anonymousId: user.anonymousId,
      role,
      identityCommitment: user.identityCommitment,
    });
    await workspace.save();

    if (user.identityCommitment) {
      addMember(workspace._id.toString(), user.identityCommitment);
    }
    const txHash = await addMemberOnChain(
      workspace._id.toString(),
      user.walletAddress,
      user.anonymousId,
      role
    );

    res.status(200).json({ member: user, txHash });
  } catch (error) {
    next(error);
  }
}

export async function listTeamController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const workspace = await WorkspaceModel.findById(req.params.workspaceId);
    if (!workspace) {
      res.status(404).json({ error: "Workspace not found" });
      return;
    }
    res.status(200).json({ members: workspace.members });
  } catch (error) {
    next(error);
  }
}

