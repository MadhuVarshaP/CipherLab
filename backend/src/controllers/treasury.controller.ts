import { Request, Response, NextFunction } from "express";
import { depositFundsOnChain, distributeRewardsOnChain } from "../services/contract.service";
import { ContributionModel } from "../models/Contribution";
import { WorkspaceModel } from "../models/Workspace";

export async function depositTreasuryController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { workspaceId, amountEth } = req.body as { workspaceId: string; amountEth?: string };
    const txHash = await depositFundsOnChain(workspaceId, amountEth ?? "0.01");
    res.status(200).json({ txHash });
  } catch (error) {
    next(error);
  }
}

export async function distributeTreasuryController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { workspaceId } = req.body as { workspaceId: string };

    const workspace = await WorkspaceModel.findById(workspaceId);
    if (!workspace) {
      res.status(404).json({ error: "Workspace not found" });
      return;
    }

    const wallets = workspace.members.map((m) => m.walletAddress);
    const txHash = await distributeRewardsOnChain(workspaceId, wallets);

    res.status(200).json({ txHash });
  } catch (error) {
    next(error);
  }
}

export async function getTreasuryController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const contributions = await ContributionModel.find({
      workspaceId: req.params.workspaceId,
    });
    const totalScore = contributions.reduce((sum, c) => sum + c.score, 0);
    res.status(200).json({
      totalScore,
      contributors: contributions,
    });
  } catch (error) {
    next(error);
  }
}

