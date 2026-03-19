"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectAuthController = connectAuthController;
const crypto_1 = __importDefault(require("crypto"));
const express_validator_1 = require("express-validator");
const User_1 = require("../models/User");
const SALT = "cipherlab_backend_v1";
function generateAnonymousId(walletAddress) {
    const hash = crypto_1.default
        .createHash("sha256")
        .update(walletAddress.toLowerCase() + SALT)
        .digest("hex");
    return `anon_${hash.slice(0, 8)}`;
}
async function connectAuthController(req, res, next) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const walletAddress = String(req.body.walletAddress).toLowerCase();
        const anonymousId = generateAnonymousId(walletAddress);
        const identityCommitment = req.body.identityCommitment ??
            BigInt("0x" + crypto_1.default.createHash("sha256").update(anonymousId).digest("hex")).toString();
        const existing = await User_1.UserModel.findOne({ walletAddress });
        const user = await User_1.UserModel.findOneAndUpdate({ walletAddress }, { walletAddress, anonymousId, identityCommitment }, { upsert: true, new: true });
        res.status(200).json({
            user,
            isNew: !existing,
        });
    }
    catch (error) {
        next(error);
    }
}
