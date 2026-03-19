import { Schema, model, InferSchemaType, Types } from "mongoose";

const resultSchema = new Schema(
  {
    workspaceId: { type: Types.ObjectId, ref: "Workspace", required: true, index: true },
    jobId: { type: Types.ObjectId, ref: "Job", required: true },
    output: { type: String, required: true },
  },
  { timestamps: true }
);

export type ResultDocument = InferSchemaType<typeof resultSchema>;
export const ResultModel = model("Result", resultSchema);

