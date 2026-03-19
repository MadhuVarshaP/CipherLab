"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const dataset_controller_1 = require("../controllers/dataset.controller");
const router = (0, express_1.Router)();
router.post("/upload", [
    (0, express_validator_1.body)("workspaceId").isString().notEmpty(),
    (0, express_validator_1.body)("name").isString().notEmpty(),
    (0, express_validator_1.body)("owner").isString().notEmpty(),
], dataset_controller_1.uploadDatasetController);
router.get("/list/:workspaceId", [(0, express_validator_1.param)("workspaceId").isString()], dataset_controller_1.listDatasetsController);
router.get("/:workspaceId", [(0, express_validator_1.param)("workspaceId").isString()], dataset_controller_1.listDatasetsController);
exports.default = router;
