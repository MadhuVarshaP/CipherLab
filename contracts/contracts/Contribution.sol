// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Workspace.sol";

contract Contribution {
    Workspace public workspace;
    address public admin;

    mapping(uint256 => mapping(address => uint256)) public contributions;
    mapping(uint256 => uint256) public totalContributions;

    event ContributionRecorded(
        uint256 indexed workspaceId,
        address indexed contributor,
        uint256 amount,
        string action
    );

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not authorized");
        _;
    }

    constructor(address workspaceAddress) {
        workspace = Workspace(workspaceAddress);
        admin = msg.sender;
    }

    function trackContribution(
        uint256 workspaceId,
        address contributor,
        uint256 amount,
        string calldata action
    ) external onlyAdmin {
        require(
            workspace.isMember(workspaceId, contributor),
            "Not a workspace member"
        );

        contributions[workspaceId][contributor] += amount;
        totalContributions[workspaceId] += amount;

        emit ContributionRecorded(workspaceId, contributor, amount, action);
    }

    function getShareBps(uint256 workspaceId, address contributor)
        external
        view
        returns (uint256)
    {
        uint256 total = totalContributions[workspaceId];
        if (total == 0) return 0;

        return (contributions[workspaceId][contributor] * 10000) / total;
    }
}