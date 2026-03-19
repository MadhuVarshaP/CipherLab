"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const logger_1 = require("../utils/logger");
function errorMiddleware(error, _req, res, _next) {
    logger_1.logger.error("Unhandled error", error);
    if (error instanceof Error) {
        res.status(500).json({
            error: error.message,
        });
        return;
    }
    res.status(500).json({ error: "Unexpected server error" });
}
