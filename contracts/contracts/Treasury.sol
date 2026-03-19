// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Contribution.sol";

contract Treasury {
    Contribution public contribution;
    address public admin;

    mapping(uint256 => uint256) public workspaceBalance;
    mapping(uint256 => mapping(address => uint256)) public pendingRewards;

    event Deposited(uint256 indexed workspaceId, uint256 amount);
    event RewardsCalculated(uint256 indexed workspaceId, uint256 totalAmount);
    event RewardClaimed(address indexed user, uint256 amount);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not authorized");
        _;
    }

    constructor(address contributionAddress) {
        contribution = Contribution(contributionAddress);
        admin = msg.sender;
    }

    function deposit(uint256 workspaceId) external payable {
        require(msg.value > 0, "No value");
        workspaceBalance[workspaceId] += msg.value;

        emit Deposited(workspaceId, msg.value);
    }

    function distributeRewards(
        uint256 workspaceId,
        address[] calldata recipients
    ) external onlyAdmin {
        uint256 total = contribution.totalContributions(workspaceId);
        uint256 balance = workspaceBalance[workspaceId];

        require(total > 0, "No contributions");
        require(balance > 0, "No funds");

        for (uint256 i = 0; i < recipients.length; i++) {
            uint256 score = contribution.contributions(workspaceId, recipients[i]);
            if (score == 0) continue;

            uint256 payout = (balance * score) / total;
            if (payout > 0) {
                pendingRewards[workspaceId][recipients[i]] += payout;
            }
        }

        workspaceBalance[workspaceId] = 0;

        emit RewardsCalculated(workspaceId, balance);
    }

    function claimReward(uint256 workspaceId) external {
        uint256 amount = pendingRewards[workspaceId][msg.sender];
        require(amount > 0, "No reward");

        pendingRewards[workspaceId][msg.sender] = 0;

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");

        emit RewardClaimed(msg.sender, amount);
    }
}