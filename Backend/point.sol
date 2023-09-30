// SPDX-License-Identifier: UNLICENSED
// Solidity++ contract for managing points on Hedera

pragma solidity >=0.7.0 <0.8.9;

contract PointSystem {
    mapping (string => uint256) private points; // Mapping of account IDs to points
    constructor() {// No need to initialize points here since it's a mapping (all values are initially 0)
    }
    // Function to get points for a Hedera account
    function getPoints(string memory accountId) public view returns (uint256) {
        return points[accountId];
    }

    // Function to increase points for a Hedera account
    function increasePoints(string memory accountId, uint256 amount) public {
        points[accountId] += amount;
    }

    // Function to set points to zero for a Hedera account
    function setPointsToZero(string memory accountId) public {
        points[accountId] = 0;
    }
}