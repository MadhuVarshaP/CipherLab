import crypto from "crypto";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { UserModel } from "../models/User";

const SALT = "cipherlab_backend_v1";

function generateAnonymousId(walletAddress: string): string {
  const hash = crypto
    .createHash("sha256")
    .update(walletAddress.toLowerCase() + SALT)
    .digest("hex");
  return `anon_${hash.slice(0, 8)}`;
}

export async function connectAuthController(
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

    const walletAddress = String(req.body.walletAddress).toLowerCase();
    const anonymousId = generateAnonymousId(walletAddress);
    const identityCommitment =
      req.body.identityCommitment ??
      BigInt("0x" + crypto.createHash("sha256").update(anonymousId).digest("hex")).toString();

    const existing = await UserModel.findOne({ walletAddress });
    const user = await UserModel.findOneAndUpdate(
      { walletAddress },
      { walletAddress, anonymousId, identityCommitment },
      { upsert: true, new: true }
    );

    res.status(200).json({
      user,
      isNew: !existing,
    });
  } catch (error) {
    next(error);
  }
}

