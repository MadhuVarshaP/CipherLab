"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorkspaceOnChain = createWorkspaceOnChain;
exports.addMemberOnChain = addMemberOnChain;
exports.recordContributionOnChain = recordContributionOnChain;
exports.depositFundsOnChain = depositFundsOnChain;
exports.distributeRewardsOnChain = distributeRewardsOnChain;
const ethers_1 = require("ethers");
const env_1 = require("../config/env");
const workspaceAbi = [
    "function createWorkspace(bytes32 id, string name)",
    "function addMember(bytes32 workspaceId, address member, bytes32 anonymousId, string role)",
];
const contributionAbi = [
    "function recordContribution(bytes32 workspaceId, address contributor, uint256 amount, string actionType)",
];
const treasuryAbi = [
    "function deposit(bytes32 workspaceId) payable",
    "function distributeRewards(bytes32 workspaceId, address[] contributors)",
];
const contractsEnabled = Boolean(env_1.env.RPC_URL) &&
    Boolean(env_1.env.PRIVATE_KEY) &&
    Boolean(env_1.env.WORKSPACE_CONTRACT) &&
    Boolean(env_1.env.CONTRIBUTION_CONTRACT) &&
    Boolean(env_1.env.TREASURY_CONTRACT);
const provider = contractsEnabled ? new ethers_1.ethers.JsonRpcProvider(env_1.env.RPC_URL) : null;
const wallet = contractsEnabled && provider ? new ethers_1.ethers.Wallet(env_1.env.PRIVATE_KEY, provider) : null;
const workspaceContract = contractsEnabled && wallet
    ? new ethers_1.ethers.Contract(env_1.env.WORKSPACE_CONTRACT, workspaceAbi, wallet)
    : null;
const contributionContract = contractsEnabled && wallet
    ? new ethers_1.ethers.Contract(env_1.env.CONTRIBUTION_CONTRACT, contributionAbi, wallet)
    : null;
const treasuryContract = contractsEnabled && wallet
    ? new ethers_1.ethers.Contract(env_1.env.TREASURY_CONTRACT, treasuryAbi, wallet)
    : null;
function toBytes32(input) {
    return ethers_1.ethers.keccak256(ethers_1.ethers.toUtf8Bytes(input));
}
async function createWorkspaceOnChain(id, name) {
    if (!workspaceContract)
        return "mock_tx_workspace";
    const tx = await workspaceContract.createWorkspace(toBytes32(id), name);
    await tx.wait();
    return tx.hash;
}
async function addMemberOnChain(workspaceId, walletAddress, anonymousId, role) {
    if (!workspaceContract)
        return "mock_tx_add_member";
    const tx = await workspaceContract.addMember(toBytes32(workspaceId), walletAddress, toBytes32(anonymousId), role);
    await tx.wait();
    return tx.hash;
}
async function recordContributionOnChain(workspaceId, walletAddress, score) {
    if (!contributionContract)
        return "mock_tx_contribution";
    const tx = await contributionContract.recordContribution(toBytes32(workspaceId), walletAddress, score, "contribution_record");
    await tx.wait();
    return tx.hash;
}
async function depositFundsOnChain(workspaceId, ethValue = "0.01") {
    if (!treasuryContract)
        return "mock_tx_deposit";
    const tx = await treasuryContract.deposit(toBytes32(workspaceId), {
        value: ethers_1.ethers.parseEther(ethValue),
    });
    await tx.wait();
    return tx.hash;
}
async function distributeRewardsOnChain(workspaceId, contributorWallets) {
    if (!treasuryContract)
        return "mock_tx_distribute";
    const tx = await treasuryContract.distributeRewards(toBytes32(workspaceId), contributorWallets);
    await tx.wait();
    return tx.hash;
}
