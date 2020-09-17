// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenSurveys is ERC20, Ownable
{
    constructor(uint256 initialSupply) public ERC20("SurveyToken", "SVT")
  {
    uint internalInitialSupply = initialSupply * (10 ** 18);
    _mint(msg.sender, internalInitialSupply);
  }
}