import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env";
import authRoutes from "./routes/auth.routes";
import workspaceRoutes from "./routes/workspace.routes";
import teamRoutes from "./routes/team.routes";
import datasetRoutes from "./routes/dataset.routes";
import jobRoutes from "./routes/job.routes";
import contributionRoutes from "./routes/contribution.routes";
import treasuryRoutes from "./routes/treasury.routes";
import resultRoutes from "./routes/result.routes";
import { errorMiddleware } from "./middleware/error.middleware";

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "2mb" }));

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true, service: "backend" });
});

app.use("/auth", authRoutes);
app.use("/workspace", workspaceRoutes);
app.use("/team", teamRoutes);
app.use("/dataset", datasetRoutes);
app.use("/jobs", jobRoutes);
app.use("/contribution", contributionRoutes);
app.use("/treasury", treasuryRoutes);
app.use("/results", resultRoutes);

app.use(errorMiddleware);

