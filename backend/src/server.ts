import { app } from "./app";
import { connectDb } from "./config/db";
import { env } from "./config/env";
import { logger } from "./utils/logger";

async function start(): Promise<void> {
  await connectDb();
  app.listen(env.PORT, () => {
    logger.info(`CipherLab backend listening on port ${env.PORT}`);
  });
}

start().catch((error) => {
  logger.error("Failed to start backend", error);
  process.exit(1);
});

