"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function required(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required env var: ${name}`);
    }
    return value;
}
exports.env = {
    PORT: Number(process.env.PORT ?? 5000),
    MONGO_URI: required("MONGO_URI"),
    RPC_URL: process.env.RPC_URL ?? "",
    PRIVATE_KEY: process.env.PRIVATE_KEY ?? "",
    WORKSPACE_CONTRACT: process.env.WORKSPACE_CONTRACT ?? "",
    CONTRIBUTION_CONTRACT: process.env.CONTRIBUTION_CONTRACT ?? "",
    TREASURY_CONTRACT: process.env.TREASURY_CONTRACT ?? "",
    SEMAPHORE_GROUP_ID: process.env.SEMAPHORE_GROUP_ID ?? "1",
    CORS_ORIGIN: process.env.CORS_ORIGIN ?? "http://localhost:3000",
};
