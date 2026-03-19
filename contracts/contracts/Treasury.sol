// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Contribution.sol";

contract Treasury {
    Contribution public contribution;
    mapping(uint256 => uint256) public workspaceBalance;

    event Deposited(uint256 indexed workspaceId, uint256 amount);
    event RewardsDistributed(uint256 indexed workspaceId, uint256 totalAmount);

    constructor(address contributionAddress) {
        contribution = Contribution(contributionAddress);
    }

    function deposit(uint256 workspaceId) external payable {
        require(msg.value > 0, "No value");
        workspaceBalance[workspaceId] += msg.value;
        emit Deposited(workspaceId, msg.value);
    }

    function distributeRewards(uint256 workspaceId, address[] calldata recipients) external {
        uint256 total = contribution.totalContributions(workspaceId);
        uint256 balance = workspaceBalance[workspaceId];
        require(total > 0, "No contributions");
        require(balance > 0, "No funds");

        for (uint256 i = 0; i < recipients.length; i++) {
            uint256 score = contribution.contributions(workspaceId, recipients[i]);
            if (score == 0) continue;
            uint256 payout = (balance * score) / total;
            if (payout > 0) {
                (bool ok, ) = recipients[i].call{value: payout}("");
                require(ok, "Transfer failed");
            }
        }

        workspaceBalance[workspaceId] = 0;
        emit RewardsDistributed(workspaceId, balance);
    }
}

