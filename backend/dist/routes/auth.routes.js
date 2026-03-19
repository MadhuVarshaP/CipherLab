"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.post("/connect", [(0, express_validator_1.body)("walletAddress").isString().matches(/^0x[a-fA-F0-9]{40}$/)], auth_controller_1.connectAuthController);
exports.default = router;
