import { Router } from "express";
import { body, param } from "express-validator";
import {
  listDatasetsController,
  uploadDatasetController,
} from "../controllers/dataset.controller";

const router = Router();

router.post(
  "/upload",
  [
    body("workspaceId").isString().notEmpty(),
    body("name").isString().notEmpty(),
    body("owner").isString().notEmpty(),
  ],
  uploadDatasetController
);
router.get("/list/:workspaceId", [param("workspaceId").isString()], listDatasetsController);
router.get("/:workspaceId", [param("workspaceId").isString()], listDatasetsController);

export default router;

