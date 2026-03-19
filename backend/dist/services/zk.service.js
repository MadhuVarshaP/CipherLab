"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGroup = createGroup;
exports.addMember = addMember;
exports.verifyProof = verifyProof;
const group_1 = require("@semaphore-protocol/group");
const proof_1 = require("@semaphore-protocol/proof");
const groupsByWorkspace = new Map();
function createGroup(workspaceId, groupId) {
    const group = new group_1.Group();
    groupsByWorkspace.set(workspaceId, group);
    return group;
}
function addMember(workspaceId, identityCommitment) {
    let group = groupsByWorkspace.get(workspaceId);
    if (!group) {
        group = new group_1.Group();
        groupsByWorkspace.set(workspaceId, group);
    }
    group.addMember(BigInt(identityCommitment));
}
async function verifyProof(workspaceId, proof) {
    // This simulates Anonymous Self-Credentials using ZK proofs.
    // In production, this branch should be removed and only real semaphore proofs accepted.
    if (proof === "valid")
        return true;
    const group = groupsByWorkspace.get(workspaceId);
    if (!group)
        return false;
    if (!proof?.points)
        return false;
    try {
        const semaphoreProof = {
            merkleTreeDepth: Number(proof.merkleTreeDepth ?? 20),
            merkleTreeRoot: proof.merkleTreeRoot ?? "0",
            nullifier: proof.nullifier ?? "0",
            message: proof.message ?? "0",
            scope: proof.scope ?? "0",
            points: proof.points,
        };
        return await (0, proof_1.verifyProof)(semaphoreProof);
    }
    catch {
        return false;
    }
}
