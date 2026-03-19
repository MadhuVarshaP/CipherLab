import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/User";

function isWalletAddress(value: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(value);
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const walletAddress = String(req.body.walletAddress ?? req.headers["x-wallet-address"] ?? "");

    if (!walletAddress || !isWalletAddress(walletAddress)) {
      res.status(400).json({ error: "Invalid walletAddress" });
      return;
    }

    const user = await UserModel.findOne({ walletAddress: walletAddress.toLowerCase() });
    if (!user) {
      res.status(401).json({ error: "User not authenticated. Call /auth/connect first." });
      return;
    }

    req.user = {
      walletAddress: user.walletAddress,
      anonymousId: user.anonymousId,
    };
    next();
  } catch (error) {
    next(error);
  }
}

