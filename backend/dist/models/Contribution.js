"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContributionModel = void 0;
const mongoose_1 = require("mongoose");
const contributionSchema = new mongoose_1.Schema({
    user: { type: String, required: true, index: true },
    workspaceId: { type: mongoose_1.Types.ObjectId, ref: "Workspace", required: true, index: true },
    score: { type: Number, required: true, default: 0 },
}, { timestamps: true });
contributionSchema.index({ user: 1, workspaceId: 1 }, { unique: true });
exports.ContributionModel = (0, mongoose_1.model)("Contribution", contributionSchema);
