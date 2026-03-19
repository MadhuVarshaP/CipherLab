import { Router } from "express";
import { body, param } from "express-validator";
import { createJobController, listJobsController } from "../controllers/job.controller";

const router = Router();

router.post(
  "/create",
  [
    body("workspaceId").isString().notEmpty(),
    body("datasetId").isString().notEmpty(),
    body("name").isString().notEmpty(),
  ],
  createJobController
);
router.get("/list/:workspaceId", [param("workspaceId").isString()], listJobsController);
router.get("/:workspaceId", [param("workspaceId").isString()], listJobsController);

export default router;

