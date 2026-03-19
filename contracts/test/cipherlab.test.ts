import { expect } from "chai";
import { ethers } from "hardhat";

describe("CipherLab Contracts", function () {
  it("creates workspace and adds member", async function () {
    const [, member] = await ethers.getSigners();

    const Workspace = await ethers.getContractFactory("Workspace");
    const workspace = await Workspace.deploy();
    await workspace.waitForDeployment();

    await workspace.createWorkspace("CipherLab");
    await workspace.addMember(1, member.address, "researcher");

    expect(await workspace.isMember(1, member.address)).to.equal(true);
  });

  it("tracks contribution and share", async function () {
    const [owner, member] = await ethers.getSigners();
    const Contribution = await ethers.getContractFactory("Contribution");
    const contribution = await Contribution.deploy();
    await contribution.waitForDeployment();

    await contribution.trackContribution(1, owner.address, 80);
    await contribution.trackContribution(1, member.address, 20);

    expect(await contribution.totalContributions(1)).to.equal(100);
    expect(await contribution.getShareBps(1, owner.address)).to.equal(8000);
  });
});

