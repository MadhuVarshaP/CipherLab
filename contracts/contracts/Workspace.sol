// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Workspace {
    struct Member {
        address wallet;
        string role;
        uint256 joinedAt;
        bool active;
    }

    struct WorkspaceInfo {
        uint256 id;
        string name;
        address owner;
        bool exists;
    }

    uint256 private _nextWorkspaceId = 1;

    mapping(uint256 => WorkspaceInfo) public workspaces;
    mapping(uint256 => Member[]) private _members;
    mapping(uint256 => mapping(address => bool)) public isMember;

    event WorkspaceCreated(uint256 indexed workspaceId, string name, address indexed owner);
    event MemberAdded(uint256 indexed workspaceId, address indexed member, string role);
    event MemberRemoved(uint256 indexed workspaceId, address indexed member);
    event RoleUpdated(uint256 indexed workspaceId, address indexed member, string newRole);

    modifier onlyOwner(uint256 workspaceId) {
        require(workspaces[workspaceId].owner == msg.sender, "Only owner");
        _;
    }

    function createWorkspace(string calldata name) external returns (uint256 workspaceId) {
        workspaceId = _nextWorkspaceId++;

        workspaces[workspaceId] = WorkspaceInfo({
            id: workspaceId,
            name: name,
            owner: msg.sender,
            exists: true
        });

        _members[workspaceId].push(Member({
            wallet: msg.sender,
            role: "owner",
            joinedAt: block.timestamp,
            active: true
        }));

        isMember[workspaceId][msg.sender] = true;

        emit WorkspaceCreated(workspaceId, name, msg.sender);
    }

    function addMember(uint256 workspaceId, address member, string calldata role)
        external
        onlyOwner(workspaceId)
    {
        require(workspaces[workspaceId].exists, "Workspace not found");
        require(!isMember[workspaceId][member], "Already member");

        _members[workspaceId].push(Member({
            wallet: member,
            role: role,
            joinedAt: block.timestamp,
            active: true
        }));

        isMember[workspaceId][member] = true;

        emit MemberAdded(workspaceId, member, role);
    }

    function removeMember(uint256 workspaceId, address member)
        external
        onlyOwner(workspaceId)
    {
        require(isMember[workspaceId][member], "Not member");

        isMember[workspaceId][member] = false;

        Member[] storage members = _members[workspaceId];
        for (uint i = 0; i < members.length; i++) {
            if (members[i].wallet == member && members[i].active) {
                members[i].active = false;
                break;
            }
        }

        emit MemberRemoved(workspaceId, member);
    }

    function updateRole(
        uint256 workspaceId,
        address member,
        string calldata newRole
    ) external onlyOwner(workspaceId) {
        require(isMember[workspaceId][member], "Not member");

        Member[] storage members = _members[workspaceId];
        for (uint i = 0; i < members.length; i++) {
            if (members[i].wallet == member && members[i].active) {
                members[i].role = newRole;
                break;
            }
        }

        emit RoleUpdated(workspaceId, member, newRole);
    }

    function getMembers(uint256 workspaceId)
        external
        view
        returns (Member[] memory)
    {
        return _members[workspaceId];
    }
}