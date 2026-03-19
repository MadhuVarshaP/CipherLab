import { ethers } from "hardhat";
import { writeFileSync } from "fs";
import { join } from "path";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);

  const workspaceFactory = await ethers.getContractFactory("Workspace");
  const workspace = await workspaceFactory.deploy();
  await workspace.waitForDeployment();

  const contributionFactory = await ethers.getContractFactory("Contribution");
  const contribution = await contributionFactory.deploy(await workspace.getAddress());
  await contribution.waitForDeployment();

  const treasuryFactory = await ethers.getContractFactory("Treasury");
  const treasury = await treasuryFactory.deploy(await contribution.getAddress());
  await treasury.waitForDeployment();

  const deployments = {
    network: (await ethers.provider.getNetwork()).name,
    contribution: await contribution.getAddress(),
    workspace: await workspace.getAddress(),
    treasury: await treasury.getAddress(),
  };

  const outputPath = join(process.cwd(), "deployments.json");
  writeFileSync(outputPath, JSON.stringify(deployments, null, 2));

  console.log("Deployments:", deployments);
  console.log("Saved:", outputPath);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

