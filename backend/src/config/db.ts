import mongoose from "mongoose";
import { env } from "./env";
import { logger } from "../utils/logger";

export async function connectDb(): Promise<void> {
  await mongoose.connect(env.MONGO_URI);
  logger.info("MongoDB connected");
}

