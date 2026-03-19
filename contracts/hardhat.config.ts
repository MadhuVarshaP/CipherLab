import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";

dotenv.config();

const privateKey = process.env.PRIVATE_KEY ?? "";
const rpcUrl = process.env.RPC_URL ?? "";
const etherscanApiKey = process.env.ETHERSCAN_API_KEY ?? "";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    sepolia: {
      url: rpcUrl || "https://ethereum-sepolia-rpc.publicnode.com",
      accounts: privateKey ? [privateKey] : [],
    },
    baseSepolia: {
      url: rpcUrl || "https://base-sepolia.drpc.org",
      chainId: 84532,
      accounts: privateKey ? [privateKey] : [],
    },
  },
  etherscan: {
    apiKey: etherscanApiKey,
  },
};

export default config;

