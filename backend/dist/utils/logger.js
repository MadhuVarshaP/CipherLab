"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
/* eslint-disable no-console */
exports.logger = {
    info: (msg, data) => console.log(`[INFO] ${msg}`, data ?? ""),
    warn: (msg, data) => console.warn(`[WARN] ${msg}`, data ?? ""),
    error: (msg, data) => console.error(`[ERROR] ${msg}`, data ?? ""),
};
