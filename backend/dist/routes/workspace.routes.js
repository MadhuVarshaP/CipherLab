"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const workspace_controller_1 = require("../controllers/workspace.controller");
const router = (0, express_1.Router)();
router.post("/create", [(0, express_validator_1.body)("name").isString().notEmpty(), (0, express_validator_1.body)("walletAddress").isString()], workspace_controller_1.createWorkspaceController);
router.get("/:id", [(0, express_validator_1.param)("id").isString()], workspace_controller_1.getWorkspaceController);
exports.default = router;
