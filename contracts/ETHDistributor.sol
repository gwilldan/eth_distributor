// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ETHDistributor {

    receive() external payable {}

    function distribute(address[] calldata recipients, uint256[] calldata amounts) external payable {
        require(recipients.length == amounts.length, "Recipients and amounts arrays must have the same length.");

        uint256 totalAmount = 0;

        for (uint256 i = 0; i < amounts.length; i++) {
            totalAmount += amounts[i];
        }

        require(msg.value >= totalAmount, "Insufficient ETH sent for distribution.");

        for (uint256 i = 0; i < recipients.length; i++) {
            (bool success, ) = recipients[i].call{value: amounts[i]}("");
            require(success, "Failed to send ETH to recipient.");
        }

        uint256 refund = msg.value - totalAmount;
        if (refund > 0) {
            (bool refundSuccess, ) = msg.sender.call{value: refund}("");
            require(refundSuccess, "Failed to refund excess ETH to sender.");
        }
    }

    function getTotalRequiredETH(address[] calldata recipients, uint256[] calldata amounts) external pure returns (uint256) {
        require(recipients.length == amounts.length, "Recipients and amounts arrays must have the same length.");

        uint256 totalAmount = 0;
        for (uint256 i = 0; i < amounts.length; i++) {
            totalAmount += amounts[i];
        }

        return totalAmount;
    }
}
