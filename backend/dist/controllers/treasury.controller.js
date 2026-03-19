"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.depositTreasuryController = depositTreasuryController;
exports.distributeTreasuryController = distributeTreasuryController;
exports.getTreasuryController = getTreasuryController;
const contract_service_1 = require("../services/contract.service");
const Contribution_1 = require("../models/Contribution");
const Workspace_1 = require("../models/Workspace");
async function depositTreasuryController(req, res, next) {
    try {
        const { workspaceId, amountEth } = req.body;
        const txHash = await (0, contract_service_1.depositFundsOnChain)(workspaceId, amountEth ?? "0.01");
        res.status(200).json({ txHash });
    }
    catch (error) {
        next(error);
    }
}
async function distributeTreasuryController(req, res, next) {
    try {
        const { workspaceId } = req.body;
        const workspace = await Workspace_1.WorkspaceModel.findById(workspaceId);
        if (!workspace) {
            res.status(404).json({ error: "Workspace not found" });
            return;
        }
        const wallets = workspace.members.map((m) => m.walletAddress);
        const txHash = await (0, contract_service_1.distributeRewardsOnChain)(workspaceId, wallets);
        res.status(200).json({ txHash });
    }
    catch (error) {
        next(error);
    }
}
async function getTreasuryController(req, res, next) {
    try {
        const contributions = await Contribution_1.ContributionModel.find({
            workspaceId: req.params.workspaceId,
        });
        const totalScore = contributions.reduce((sum, c) => sum + c.score, 0);
        res.status(200).json({
            totalScore,
            contributors: contributions,
        });
    }
    catch (error) {
        next(error);
    }
}
