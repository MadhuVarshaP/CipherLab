import { Schema, model, InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    walletAddress: { type: String, required: true, unique: true, index: true },
    anonymousId: { type: String, required: true, unique: true, index: true },
    identityCommitment: { type: String, required: false },
  },
  { timestamps: true }
);

export type UserDocument = InferSchemaType<typeof userSchema>;
export const UserModel = model("User", userSchema);

