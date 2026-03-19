"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatasetModel = void 0;
const mongoose_1 = require("mongoose");
const datasetSchema = new mongoose_1.Schema({
    workspaceId: { type: mongoose_1.Types.ObjectId, ref: "Workspace", required: true, index: true },
    name: { type: String, required: true },
    owner: { type: String, required: true },
    hash: { type: String, required: true },
    metadata: {
        size: { type: String, default: "2.4 MB" },
        category: { type: String, default: "General" },
    },
}, { timestamps: true });
exports.DatasetModel = (0, mongoose_1.model)("Dataset", datasetSchema);
