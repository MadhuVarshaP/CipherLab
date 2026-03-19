import { Schema, model, InferSchemaType, Types } from "mongoose";

const jobSchema = new Schema(
  {
    workspaceId: { type: Types.ObjectId, ref: "Workspace", required: true, index: true },
    datasetId: { type: Types.ObjectId, ref: "Dataset", required: true },
    status: {
      type: String,
      enum: ["pending", "running", "completed", "failed"],
      default: "pending",
      index: true,
    },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export type JobDocument = InferSchemaType<typeof jobSchema>;
export const JobModel = model("Job", jobSchema);

