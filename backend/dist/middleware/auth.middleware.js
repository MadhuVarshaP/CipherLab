"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const User_1 = require("../models/User");
function isWalletAddress(value) {
    return /^0x[a-fA-F0-9]{40}$/.test(value);
}
async function authMiddleware(req, res, next) {
    try {
        const walletAddress = String(req.body.walletAddress ?? req.headers["x-wallet-address"] ?? "");
        if (!walletAddress || !isWalletAddress(walletAddress)) {
            res.status(400).json({ error: "Invalid walletAddress" });
            return;
        }
        const user = await User_1.UserModel.findOne({ walletAddress: walletAddress.toLowerCase() });
        if (!user) {
            res.status(401).json({ error: "User not authenticated. Call /auth/connect first." });
            return;
        }
        req.user = {
            walletAddress: user.walletAddress,
            anonymousId: user.anonymousId,
        };
        next();
    }
    catch (error) {
        next(error);
    }
}
