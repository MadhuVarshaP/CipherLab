import { Request, Router } from "express";
import { param } from "express-validator";
import { listResultsController } from "../controllers/result.controller";

const router = Router();

router.get("/", (req, res, next) => {
  (req as Request & { params: { workspaceId: string } }).params.workspaceId = String(
    req.query.workspaceId ?? ""
  );
  return listResultsController(req, res, next);
});
router.get("/:workspaceId", [param("workspaceId").isString()], listResultsController);

export default router;

