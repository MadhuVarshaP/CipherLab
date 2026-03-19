"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const result_controller_1 = require("../controllers/result.controller");
const router = (0, express_1.Router)();
router.get("/", (req, res, next) => {
    req.params.workspaceId = String(req.query.workspaceId ?? "");
    return (0, result_controller_1.listResultsController)(req, res, next);
});
router.get("/:workspaceId", [(0, express_validator_1.param)("workspaceId").isString()], result_controller_1.listResultsController);
exports.default = router;
