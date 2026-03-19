import { Schema, model, InferSchemaType, Types } from "mongoose";

const contributionSchema = new Schema(
  {
    user: { type: String, required: true, index: true },
    workspaceId: { type: Types.ObjectId, ref: "Workspace", required: true, index: true },
    score: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

contributionSchema.index({ user: 1, workspaceId: 1 }, { unique: true });

export type ContributionDocument = InferSchemaType<typeof contributionSchema>;
export const ContributionModel = model("Contribution", contributionSchema);

