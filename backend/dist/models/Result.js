"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultModel = void 0;
const mongoose_1 = require("mongoose");
const resultSchema = new mongoose_1.Schema({
    workspaceId: { type: mongoose_1.Types.ObjectId, ref: "Workspace", required: true, index: true },
    jobId: { type: mongoose_1.Types.ObjectId, ref: "Job", required: true },
    output: { type: String, required: true },
}, { timestamps: true });
exports.ResultModel = (0, mongoose_1.model)("Result", resultSchema);
