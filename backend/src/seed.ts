import { connectDb } from "./config/db";
import { UserModel } from "./models/User";
import { WorkspaceModel } from "./models/Workspace";
import { DatasetModel } from "./models/Dataset";
import { JobModel } from "./models/Job";
import { ResultModel } from "./models/Result";
import { ContributionModel } from "./models/Contribution";
import { logger } from "./utils/logger";

async function seed(): Promise<void> {
  await connectDb();

  await Promise.all([
    UserModel.deleteMany({}),
    WorkspaceModel.deleteMany({}),
    DatasetModel.deleteMany({}),
    JobModel.deleteMany({}),
    ResultModel.deleteMany({}),
    ContributionModel.deleteMany({}),
  ]);

  const users = await UserModel.insertMany([
    { walletAddress: "0x1111111111111111111111111111111111111111", anonymousId: "anon_a3f29c1b" },
    { walletAddress: "0x2222222222222222222222222222222222222222", anonymousId: "anon_b8d14e2f" },
    { walletAddress: "0x3333333333333333333333333333333333333333", anonymousId: "anon_c92a7b3d" },
    { walletAddress: "0x4444444444444444444444444444444444444444", anonymousId: "anon_d47f1c8e" },
  ]);

  const workspace = await WorkspaceModel.create({
    name: "AI Research Lab",
    semaphoreGroupId: "seed_group_1",
    members: users.map((u, idx) => ({
      walletAddress: u.walletAddress,
      anonymousId: u.anonymousId,
      role: idx === 0 ? "owner" : "member",
      identityCommitment: (BigInt(idx + 1000)).toString(),
    })),
  });

  const datasets = await DatasetModel.insertMany([
    { workspaceId: workspace._id, name: "Lung Scan Dataset", owner: "anon_a3f29c1b", hash: "0xaaa", metadata: { category: "Medical Imaging", size: "2.4 MB" } },
    { workspaceId: workspace._id, name: "Climate Patterns 2020-2024", owner: "anon_b8d14e2f", hash: "0xbbb", metadata: { category: "Climate", size: "3.2 MB" } },
    { workspaceId: workspace._id, name: "Genomic Markers v2", owner: "anon_c92a7b3d", hash: "0xccc", metadata: { category: "Genomics", size: "1.8 MB" } },
    { workspaceId: workspace._id, name: "Financial Risk Matrix", owner: "anon_d47f1c8e", hash: "0xddd", metadata: { category: "Financial", size: "2.0 MB" } },
    { workspaceId: workspace._id, name: "Neural Activity Logs", owner: "anon_a3f29c1b", hash: "0xeee", metadata: { category: "Medical Imaging", size: "2.1 MB" } },
  ]);

  const jobs = await JobModel.insertMany([
    { workspaceId: workspace._id, datasetId: datasets[0]._id, name: "Tumor Train", status: "completed" },
    { workspaceId: workspace._id, datasetId: datasets[1]._id, name: "Climate Forecast", status: "completed" },
    { workspaceId: workspace._id, datasetId: datasets[2]._id, name: "Genome Stats", status: "running" },
    { workspaceId: workspace._id, datasetId: datasets[3]._id, name: "Risk Model", status: "running" },
    { workspaceId: workspace._id, datasetId: datasets[4]._id, name: "Signal Cleanup", status: "pending" },
    { workspaceId: workspace._id, datasetId: datasets[0]._id, name: "Edge Case Job", status: "failed" },
  ]);

  await ResultModel.insertMany(
    jobs.slice(0, 6).map((job, idx) => ({
      workspaceId: workspace._id,
      jobId: job._id,
      output: `Mock result #${idx + 1}`,
    }))
  );

  await ContributionModel.insertMany([
    { user: "anon_a3f29c1b", workspaceId: workspace._id, score: 85 },
    { user: "anon_b8d14e2f", workspaceId: workspace._id, score: 62 },
    { user: "anon_c92a7b3d", workspaceId: workspace._id, score: 41 },
    { user: "anon_d47f1c8e", workspaceId: workspace._id, score: 18 },
  ]);

  logger.info("Seed complete");
  process.exit(0);
}

seed().catch((error) => {
  logger.error("Seed failed", error);
  process.exit(1);
});

