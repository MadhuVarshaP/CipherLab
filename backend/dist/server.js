"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const db_1 = require("./config/db");
const env_1 = require("./config/env");
const logger_1 = require("./utils/logger");
async function start() {
    await (0, db_1.connectDb)();
    app_1.app.listen(env_1.env.PORT, () => {
        logger_1.logger.info(`CipherLab backend listening on port ${env_1.env.PORT}`);
    });
}
start().catch((error) => {
    logger_1.logger.error("Failed to start backend", error);
    process.exit(1);
});
