"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const env_1 = require("./config/env");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const workspace_routes_1 = __importDefault(require("./routes/workspace.routes"));
const team_routes_1 = __importDefault(require("./routes/team.routes"));
const dataset_routes_1 = __importDefault(require("./routes/dataset.routes"));
const job_routes_1 = __importDefault(require("./routes/job.routes"));
const contribution_routes_1 = __importDefault(require("./routes/contribution.routes"));
const treasury_routes_1 = __importDefault(require("./routes/treasury.routes"));
const result_routes_1 = __importDefault(require("./routes/result.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
exports.app = (0, express_1.default)();
exports.app.use((0, helmet_1.default)());
exports.app.use((0, cors_1.default)({
    origin: env_1.env.CORS_ORIGIN,
    credentials: true,
}));
exports.app.use(express_1.default.json({ limit: "2mb" }));
exports.app.get("/health", (_req, res) => {
    res.status(200).json({ ok: true, service: "backend" });
});
exports.app.use("/auth", auth_routes_1.default);
exports.app.use("/workspace", workspace_routes_1.default);
exports.app.use("/team", team_routes_1.default);
exports.app.use("/dataset", dataset_routes_1.default);
exports.app.use("/jobs", job_routes_1.default);
exports.app.use("/contribution", contribution_routes_1.default);
exports.app.use("/treasury", treasury_routes_1.default);
exports.app.use("/results", result_routes_1.default);
exports.app.use(error_middleware_1.errorMiddleware);
