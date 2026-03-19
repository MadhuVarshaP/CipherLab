"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceModel = void 0;
const mongoose_1 = require("mongoose");
const memberSchema = new mongoose_1.Schema({
    walletAddress: { type: String, required: true },
    anonymousId: { type: String, required: true },
    role: { type: String, required: true, default: "member" },
    identityCommitment: { type: String, required: false },
}, { _id: false });
const workspaceSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    members: { type: [memberSchema], default: [] },
    semaphoreGroupId: { type: String, required: true },
}, { timestamps: true });
exports.WorkspaceModel = (0, mongoose_1.model)("Workspace", workspaceSchema);
