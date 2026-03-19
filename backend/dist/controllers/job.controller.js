"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJobController = createJobController;
exports.listJobsController = listJobsController;
const express_validator_1 = require("express-validator");
const Job_1 = require("../models/Job");
const Result_1 = require("../models/Result");
const zk_service_1 = require("../services/zk.service");
async function createJobController(req, res, next) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { workspaceId, datasetId, name, proof } = req.body;
        const proofOk = await (0, zk_service_1.verifyProof)(workspaceId, proof);
        if (!proofOk) {
            res.status(403).json({ error: "Invalid semaphore proof" });
            return;
        }
        const job = await Job_1.JobModel.create({
            workspaceId,
            datasetId,
            name,
            status: "pending",
        });
        // Hybrid demo behavior: simulate execution to completion.
        setTimeout(async () => {
            await Job_1.JobModel.findByIdAndUpdate(job._id, { status: "running" });
        }, 1200);
        setTimeout(async () => {
            await Job_1.JobModel.findByIdAndUpdate(job._id, { status: "completed" });
            await Result_1.ResultModel.create({
                workspaceId,
                jobId: job._id,
                output: "Accuracy 92.4% | Loss 0.17 | F1 0.90",
            });
        }, 4200);
        res.status(201).json({ job });
    }
    catch (error) {
        next(error);
    }
}
async function listJobsController(req, res, next) {
    try {
        const jobs = await Job_1.JobModel.find({ workspaceId: req.params.workspaceId }).sort({
            createdAt: -1,
        });
        res.status(200).json({ jobs });
    }
    catch (error) {
        next(error);
    }
}
