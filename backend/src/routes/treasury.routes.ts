import { Router } from "express";
import { body, param } from "express-validator";
import {
  depositTreasuryController,
  distributeTreasuryController,
  getTreasuryController,
} from "../controllers/treasury.controller";

const router = Router();

router.post("/deposit", [body("workspaceId").isString().notEmpty()], depositTreasuryController);
router.post(
  "/distribute",
  [body("workspaceId").isString().notEmpty()],
  distributeTreasuryController
);
router.get("/:workspaceId", [param("workspaceId").isString()], getTreasuryController);

export default router;

