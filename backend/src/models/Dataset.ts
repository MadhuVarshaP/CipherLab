import { Schema, model, InferSchemaType, Types } from "mongoose";

const datasetSchema = new Schema(
  {
    workspaceId: { type: Types.ObjectId, ref: "Workspace", required: true, index: true },
    name: { type: String, required: true },
    owner: { type: String, required: true },
    hash: { type: String, required: true },
    metadata: {
      size: { type: String, default: "2.4 MB" },
      category: { type: String, default: "General" },
    },
  },
  { timestamps: true }
);

export type DatasetDocument = InferSchemaType<typeof datasetSchema>;
export const DatasetModel = model("Dataset", datasetSchema);

