"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./config/db");
const User_1 = require("./models/User");
const Workspace_1 = require("./models/Workspace");
const Dataset_1 = require("./models/Dataset");
const Job_1 = require("./models/Job");
const Result_1 = require("./models/Result");
const Contribution_1 = require("./models/Contribution");
const logger_1 = require("./utils/logger");
async function seed() {
    await (0, db_1.connectDb)();
    await Promise.all([
        User_1.UserModel.deleteMany({}),
        Workspace_1.WorkspaceModel.deleteMany({}),
        Dataset_1.DatasetModel.deleteMany({}),
        Job_1.JobModel.deleteMany({}),
        Result_1.ResultModel.deleteMany({}),
        Contribution_1.ContributionModel.deleteMany({}),
    ]);
    const users = await User_1.UserModel.insertMany([
        { walletAddress: "0x1111111111111111111111111111111111111111", anonymousId: "anon_a3f29c1b" },
        { walletAddress: "0x2222222222222222222222222222222222222222", anonymousId: "anon_b8d14e2f" },
        { walletAddress: "0x3333333333333333333333333333333333333333", anonymousId: "anon_c92a7b3d" },
        { walletAddress: "0x4444444444444444444444444444444444444444", anonymousId: "anon_d47f1c8e" },
    ]);
    const workspace = await Workspace_1.WorkspaceModel.create({
        name: "AI Research Lab",
        semaphoreGroupId: "seed_group_1",
        members: users.map((u, idx) => ({
            walletAddress: u.walletAddress,
            anonymousId: u.anonymousId,
            role: idx === 0 ? "owner" : "member",
            identityCommitment: (BigInt(idx + 1000)).toString(),
        })),
    });
    const datasets = await Dataset_1.DatasetModel.insertMany([
        { workspaceId: workspace._id, name: "Lung Scan Dataset", owner: "anon_a3f29c1b", hash: "0xaaa", metadata: { category: "Medical Imaging", size: "2.4 MB" } },
        { workspaceId: workspace._id, name: "Climate Patterns 2020-2024", owner: "anon_b8d14e2f", hash: "0xbbb", metadata: { category: "Climate", size: "3.2 MB" } },
        { workspaceId: workspace._id, name: "Genomic Markers v2", owner: "anon_c92a7b3d", hash: "0xccc", metadata: { category: "Genomics", size: "1.8 MB" } },
        { workspaceId: workspace._id, name: "Financial Risk Matrix", owner: "anon_d47f1c8e", hash: "0xddd", metadata: { category: "Financial", size: "2.0 MB" } },
        { workspaceId: workspace._id, name: "Neural Activity Logs", owner: "anon_a3f29c1b", hash: "0xeee", metadata: { category: "Medical Imaging", size: "2.1 MB" } },
    ]);
    const jobs = await Job_1.JobModel.insertMany([
        { workspaceId: workspace._id, datasetId: datasets[0]._id, name: "Tumor Train", status: "completed" },
        { workspaceId: workspace._id, datasetId: datasets[1]._id, name: "Climate Forecast", status: "completed" },
        { workspaceId: workspace._id, datasetId: datasets[2]._id, name: "Genome Stats", status: "running" },
        { workspaceId: workspace._id, datasetId: datasets[3]._id, name: "Risk Model", status: "running" },
        { workspaceId: workspace._id, datasetId: datasets[4]._id, name: "Signal Cleanup", status: "pending" },
        { workspaceId: workspace._id, datasetId: datasets[0]._id, name: "Edge Case Job", status: "failed" },
    ]);
    await Result_1.ResultModel.insertMany(jobs.slice(0, 6).map((job, idx) => ({
        workspaceId: workspace._id,
        jobId: job._id,
        output: `Mock result #${idx + 1}`,
    })));
    await Contribution_1.ContributionModel.insertMany([
        { user: "anon_a3f29c1b", workspaceId: workspace._id, score: 85 },
        { user: "anon_b8d14e2f", workspaceId: workspace._id, score: 62 },
        { user: "anon_c92a7b3d", workspaceId: workspace._id, score: 41 },
        { user: "anon_d47f1c8e", workspaceId: workspace._id, score: 18 },
    ]);
    logger_1.logger.info("Seed complete");
    process.exit(0);
}
seed().catch((error) => {
    logger_1.logger.error("Seed failed", error);
    process.exit(1);
});
