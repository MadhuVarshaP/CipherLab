import { ethers } from "ethers";
import { env } from "../config/env";

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

const contractsEnabled =
  Boolean(env.RPC_URL) &&
  Boolean(env.PRIVATE_KEY) &&
  Boolean(env.WORKSPACE_CONTRACT) &&
  Boolean(env.CONTRIBUTION_CONTRACT) &&
  Boolean(env.TREASURY_CONTRACT);

const provider = contractsEnabled ? new ethers.JsonRpcProvider(env.RPC_URL) : null;
const wallet = contractsEnabled && provider ? new ethers.Wallet(env.PRIVATE_KEY, provider) : null;

const workspaceContract =
  contractsEnabled && wallet
    ? new ethers.Contract(env.WORKSPACE_CONTRACT, workspaceAbi, wallet)
    : null;
const contributionContract =
  contractsEnabled && wallet
    ? new ethers.Contract(env.CONTRIBUTION_CONTRACT, contributionAbi, wallet)
    : null;
const treasuryContract =
  contractsEnabled && wallet
    ? new ethers.Contract(env.TREASURY_CONTRACT, treasuryAbi, wallet)
    : null;

function toBytes32(input: string): string {
  return ethers.keccak256(ethers.toUtf8Bytes(input));
}

export async function createWorkspaceOnChain(id: string, name: string): Promise<string> {
  if (!workspaceContract) return "mock_tx_workspace";
  const tx = await workspaceContract.createWorkspace(toBytes32(id), name);
  await tx.wait();
  return tx.hash as string;
}

export async function addMemberOnChain(
  workspaceId: string,
  walletAddress: string,
  anonymousId: string,
  role: string
): Promise<string> {
  if (!workspaceContract) return "mock_tx_add_member";
  const tx = await workspaceContract.addMember(
    toBytes32(workspaceId),
    walletAddress,
    toBytes32(anonymousId),
    role
  );
  await tx.wait();
  return tx.hash as string;
}

export async function recordContributionOnChain(
  workspaceId: string,
  walletAddress: string,
  score: number
): Promise<string> {
  if (!contributionContract) return "mock_tx_contribution";
  const tx = await contributionContract.recordContribution(
    toBytes32(workspaceId),
    walletAddress,
    score,
    "contribution_record"
  );
  await tx.wait();
  return tx.hash as string;
}

export async function depositFundsOnChain(
  workspaceId: string,
  ethValue = "0.01"
): Promise<string> {
  if (!treasuryContract) return "mock_tx_deposit";
  const tx = await treasuryContract.deposit(toBytes32(workspaceId), {
    value: ethers.parseEther(ethValue),
  });
  await tx.wait();
  return tx.hash as string;
}

export async function distributeRewardsOnChain(
  workspaceId: string,
  contributorWallets: string[]
): Promise<string> {
  if (!treasuryContract) return "mock_tx_distribute";
  const tx = await treasuryContract.distributeRewards(
    toBytes32(workspaceId),
    contributorWallets
  );
  await tx.wait();
  return tx.hash as string;
}

