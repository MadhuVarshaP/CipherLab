"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const contribution_controller_1 = require("../controllers/contribution.controller");
const router = (0, express_1.Router)();
router.post("/record", [
    (0, express_validator_1.body)("walletAddress").isString().matches(/^0x[a-fA-F0-9]{40}$/),
    (0, express_validator_1.body)("workspaceId").isString().notEmpty(),
    (0, express_validator_1.body)("score").isNumeric(),
], contribution_controller_1.recordContributionController);
router.get("/rewards/:workspaceId", [(0, express_validator_1.param)("workspaceId").isString()], contribution_controller_1.getRewardsController);
exports.default = router;
