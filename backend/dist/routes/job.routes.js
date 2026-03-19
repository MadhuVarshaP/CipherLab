"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const job_controller_1 = require("../controllers/job.controller");
const router = (0, express_1.Router)();
router.post("/create", [
    (0, express_validator_1.body)("workspaceId").isString().notEmpty(),
    (0, express_validator_1.body)("datasetId").isString().notEmpty(),
    (0, express_validator_1.body)("name").isString().notEmpty(),
], job_controller_1.createJobController);
router.get("/list/:workspaceId", [(0, express_validator_1.param)("workspaceId").isString()], job_controller_1.listJobsController);
router.get("/:workspaceId", [(0, express_validator_1.param)("workspaceId").isString()], job_controller_1.listJobsController);
exports.default = router;
