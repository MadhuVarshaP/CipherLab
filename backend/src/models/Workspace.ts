import { Schema, model, InferSchemaType } from "mongoose";

const memberSchema = new Schema(
  {
    walletAddress: { type: String, required: true },
    anonymousId: { type: String, required: true },
    role: { type: String, required: true, default: "member" },
    identityCommitment: { type: String, required: false },
  },
  { _id: false }
);

const workspaceSchema = new Schema(
  {
    name: { type: String, required: true },
    members: { type: [memberSchema], default: [] },
    semaphoreGroupId: { type: String, required: true },
  },
  { timestamps: true }
);

export type WorkspaceDocument = InferSchemaType<typeof workspaceSchema>;
export const WorkspaceModel = model("Workspace", workspaceSchema);

