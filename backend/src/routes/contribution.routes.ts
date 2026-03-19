import { Router } from "express";
import { body, param } from "express-validator";
import {
  getRewardsController,
  recordContributionController,
} from "../controllers/contribution.controller";

const router = Router();

router.post(
  "/record",
  [
    body("walletAddress").isString().matches(/^0x[a-fA-F0-9]{40}$/),
    body("workspaceId").isString().notEmpty(),
    body("score").isNumeric(),
  ],
  recordContributionController
);
router.get("/rewards/:workspaceId", [param("workspaceId").isString()], getRewardsController);

export default router;

