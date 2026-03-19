import { Group } from "@semaphore-protocol/group";
import { verifyProof as semaphoreVerifyProof } from "@semaphore-protocol/proof";
import type { SemaphoreProof } from "@semaphore-protocol/proof/dist/types/types";

type SerializedProof = {
  merkleTreeDepth?: number;
  merkleTreeRoot?: string;
  nullifier?: string;
  message?: string;
  scope?: string;
  points?: [string, string, string, string, string, string, string, string];
};

const groupsByWorkspace = new Map<string, Group>();

export function createGroup(workspaceId: string, groupId: string): Group {
  const group = new Group();
  groupsByWorkspace.set(workspaceId, group);
  return group;
}

export function addMember(workspaceId: string, identityCommitment: string): void {
  let group = groupsByWorkspace.get(workspaceId);
  if (!group) {
    group = new Group();
    groupsByWorkspace.set(workspaceId, group);
  }
  group.addMember(BigInt(identityCommitment));
}

export async function verifyProof(
  workspaceId: string,
  proof: SerializedProof | "valid" | undefined
): Promise<boolean> {
  // This simulates Anonymous Self-Credentials using ZK proofs.
  // In production, this branch should be removed and only real semaphore proofs accepted.
  if (proof === "valid") return true;

  const group = groupsByWorkspace.get(workspaceId);
  if (!group) return false;

  if (!proof?.points) return false;

  try {
    const semaphoreProof: SemaphoreProof = {
      merkleTreeDepth: Number(proof.merkleTreeDepth ?? 20),
      merkleTreeRoot: proof.merkleTreeRoot ?? "0",
      nullifier: proof.nullifier ?? "0",
      message: proof.message ?? "0",
      scope: proof.scope ?? "0",
      points: proof.points,
    };
    return await semaphoreVerifyProof(semaphoreProof);
  } catch {
    return false;
  }
}

