"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const team_controller_1 = require("../controllers/team.controller");
const router = (0, express_1.Router)();
router.post("/add", [
    (0, express_validator_1.body)("workspaceId").isString().notEmpty(),
    (0, express_validator_1.body)("walletAddress").isString().matches(/^0x[a-fA-F0-9]{40}$/),
    (0, express_validator_1.body)("role").isString().notEmpty(),
], team_controller_1.addTeamMemberController);
router.get("/list/:workspaceId", [(0, express_validator_1.param)("workspaceId").isString()], team_controller_1.listTeamController);
router.get("/:workspaceId", [(0, express_validator_1.param)("workspaceId").isString()], team_controller_1.listTeamController);
exports.default = router;
