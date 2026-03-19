import { Router } from "express";
import { body, param } from "express-validator";
import {
  addTeamMemberController,
  listTeamController,
} from "../controllers/team.controller";

const router = Router();

router.post(
  "/add",
  [
    body("workspaceId").isString().notEmpty(),
    body("walletAddress").isString().matches(/^0x[a-fA-F0-9]{40}$/),
    body("role").isString().notEmpty(),
  ],
  addTeamMemberController
);
router.get("/list/:workspaceId", [param("workspaceId").isString()], listTeamController);
router.get("/:workspaceId", [param("workspaceId").isString()], listTeamController);

export default router;

