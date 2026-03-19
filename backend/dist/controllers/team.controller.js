"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTeamMemberController = addTeamMemberController;
exports.listTeamController = listTeamController;
const express_validator_1 = require("express-validator");
const Workspace_1 = require("../models/Workspace");
const User_1 = require("../models/User");
const zk_service_1 = require("../services/zk.service");
const contract_service_1 = require("../services/contract.service");
async function addTeamMemberController(req, res, next) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { workspaceId, walletAddress, role } = req.body;
        const workspace = await Workspace_1.WorkspaceModel.findById(workspaceId);
        if (!workspace) {
            res.status(404).json({ error: "Workspace not found" });
            return;
        }
        const user = await User_1.UserModel.findOne({ walletAddress: walletAddress.toLowerCase() });
        if (!user) {
            res.status(404).json({ error: "User not found. Connect wallet first." });
            return;
        }
        const exists = workspace.members.some((m) => m.walletAddress === user.walletAddress);
        if (exists) {
            res.status(409).json({ error: "Member already exists" });
            return;
        }
        workspace.members.push({
            walletAddress: user.walletAddress,
            anonymousId: user.anonymousId,
            role,
            identityCommitment: user.identityCommitment,
        });
        await workspace.save();
        if (user.identityCommitment) {
            (0, zk_service_1.addMember)(workspace._id.toString(), user.identityCommitment);
        }
        const txHash = await (0, contract_service_1.addMemberOnChain)(workspace._id.toString(), user.walletAddress, user.anonymousId, role);
        res.status(200).json({ member: user, txHash });
    }
    catch (error) {
        next(error);
    }
}
async function listTeamController(req, res, next) {
    try {
        const workspace = await Workspace_1.WorkspaceModel.findById(req.params.workspaceId);
        if (!workspace) {
            res.status(404).json({ error: "Workspace not found" });
            return;
        }
        res.status(200).json({ members: workspace.members });
    }
    catch (error) {
        next(error);
    }
}
