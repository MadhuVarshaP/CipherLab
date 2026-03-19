"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorkspaceController = createWorkspaceController;
exports.getWorkspaceController = getWorkspaceController;
const express_validator_1 = require("express-validator");
const Workspace_1 = require("../models/Workspace");
const zk_service_1 = require("../services/zk.service");
const contract_service_1 = require("../services/contract.service");
const User_1 = require("../models/User");
async function createWorkspaceController(req, res, next) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { name, walletAddress } = req.body;
        const user = await User_1.UserModel.findOne({ walletAddress: walletAddress.toLowerCase() });
        if (!user) {
            res.status(404).json({ error: "User not found. Connect wallet first." });
            return;
        }
        const workspace = await Workspace_1.WorkspaceModel.create({
            name,
            members: [
                {
                    walletAddress: user.walletAddress,
                    anonymousId: user.anonymousId,
                    role: "owner",
                    identityCommitment: user.identityCommitment,
                },
            ],
            semaphoreGroupId: `group_${Date.now()}`,
        });
        (0, zk_service_1.createGroup)(workspace._id.toString(), workspace.semaphoreGroupId);
        const txHash = await (0, contract_service_1.createWorkspaceOnChain)(workspace._id.toString(), name);
        res.status(201).json({ workspace, txHash });
    }
    catch (error) {
        next(error);
    }
}
async function getWorkspaceController(req, res, next) {
    try {
        const workspace = await Workspace_1.WorkspaceModel.findById(req.params.id);
        if (!workspace) {
            res.status(404).json({ error: "Workspace not found" });
            return;
        }
        res.status(200).json({ workspace });
    }
    catch (error) {
        next(error);
    }
}
