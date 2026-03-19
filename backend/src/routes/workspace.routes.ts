import { Router } from "express";
import { body, param } from "express-validator";
import {
  createWorkspaceController,
  getWorkspaceController,
} from "../controllers/workspace.controller";

const router = Router();

router.post(
  "/create",
  [body("name").isString().notEmpty(), body("walletAddress").isString()],
  createWorkspaceController
);
router.get("/:id", [param("id").isString()], getWorkspaceController);

export default router;

