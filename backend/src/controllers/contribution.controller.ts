import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ContributionModel } from "../models/Contribution";
import { UserModel } from "../models/User";
import { recordContributionOnChain } from "../services/contract.service";
import { computeRewardDistribution } from "../services/reward.service";

export async function recordContributionController(
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

    const { walletAddress, workspaceId, score } = req.body as {
      walletAddress: string;
      workspaceId: string;
      score: number;
    };

    const user = await UserModel.findOne({ walletAddress: walletAddress.toLowerCase() });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const contribution = await ContributionModel.findOneAndUpdate(
      { user: user.anonymousId, workspaceId },
      { $inc: { score } },
      { new: true, upsert: true }
    );

    const txHash = await recordContributionOnChain(workspaceId, walletAddress, score);

    res.status(200).json({ contribution, txHash });
  } catch (error) {
    next(error);
  }
}

export async function getRewardsController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const contributions = await ContributionModel.find({
      workspaceId: req.params.workspaceId,
    });
    const rewards = computeRewardDistribution(contributions);
    res.status(200).json({ rewards });
  } catch (error) {
    next(error);
  }
}

