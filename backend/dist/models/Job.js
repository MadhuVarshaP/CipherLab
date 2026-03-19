"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobModel = void 0;
const mongoose_1 = require("mongoose");
const jobSchema = new mongoose_1.Schema({
    workspaceId: { type: mongoose_1.Types.ObjectId, ref: "Workspace", required: true, index: true },
    datasetId: { type: mongoose_1.Types.ObjectId, ref: "Dataset", required: true },
    status: {
        type: String,
        enum: ["pending", "running", "completed", "failed"],
        default: "pending",
        index: true,
    },
    name: { type: String, required: true },
}, { timestamps: true });
exports.JobModel = (0, mongoose_1.model)("Job", jobSchema);
