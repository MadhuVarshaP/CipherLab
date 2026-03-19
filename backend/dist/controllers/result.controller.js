"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listResultsController = listResultsController;
const Result_1 = require("../models/Result");
async function listResultsController(req, res, next) {
    try {
        const results = await Result_1.ResultModel.find({ workspaceId: req.params.workspaceId }).sort({
            createdAt: -1,
        });
        res.status(200).json({ results });
    }
    catch (error) {
        next(error);
    }
}
