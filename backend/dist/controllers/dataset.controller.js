"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadDatasetController = uploadDatasetController;
exports.listDatasetsController = listDatasetsController;
const crypto_1 = __importDefault(require("crypto"));
const express_validator_1 = require("express-validator");
const Dataset_1 = require("../models/Dataset");
const zk_service_1 = require("../services/zk.service");
async function uploadDatasetController(req, res, next) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { workspaceId, name, owner, metadata, proof } = req.body;
        const proofOk = await (0, zk_service_1.verifyProof)(workspaceId, proof);
        if (!proofOk) {
            res.status(403).json({ error: "Invalid semaphore proof" });
            return;
        }
        const hash = "0x" + crypto_1.default.createHash("sha256").update(name + Date.now()).digest("hex");
        const dataset = await Dataset_1.DatasetModel.create({
            workspaceId,
            name,
            owner,
            hash,
            metadata: {
                size: metadata?.size ?? "2.4 MB",
                category: metadata?.category ?? "General",
            },
        });
        res.status(201).json({ dataset });
    }
    catch (error) {
        next(error);
    }
}
async function listDatasetsController(req, res, next) {
    try {
        const datasets = await Dataset_1.DatasetModel.find({ workspaceId: req.params.workspaceId }).sort({
            createdAt: -1,
        });
        res.status(200).json({ datasets });
    }
    catch (error) {
        next(error);
    }
}
