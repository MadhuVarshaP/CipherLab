"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordContributionController = recordContributionController;
exports.getRewardsController = getRewardsController;
const express_validator_1 = require("express-validator");
const Contribution_1 = require("../models/Contribution");
const User_1 = require("../models/User");
const contract_service_1 = require("../services/contract.service");
const reward_service_1 = require("../services/reward.service");
async function recordContributionController(req, res, next) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { walletAddress, workspaceId, score } = req.body;
        const user = await User_1.UserModel.findOne({ walletAddress: walletAddress.toLowerCase() });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        const contribution = await Contribution_1.ContributionModel.findOneAndUpdate({ user: user.anonymousId, workspaceId }, { $inc: { score } }, { new: true, upsert: true });
        const txHash = await (0, contract_service_1.recordContributionOnChain)(workspaceId, walletAddress, score);
        res.status(200).json({ contribution, txHash });
    }
    catch (error) {
        next(error);
    }
}
async function getRewardsController(req, res, next) {
    try {
        const contributions = await Contribution_1.ContributionModel.find({
            workspaceId: req.params.workspaceId,
        });
        const rewards = (0, reward_service_1.computeRewardDistribution)(contributions);
        res.status(200).json({ rewards });
    }
    catch (error) {
        next(error);
    }
}
