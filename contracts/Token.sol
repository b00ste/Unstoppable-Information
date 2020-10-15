// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC777/ERC777.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC777, Ownable
{
  constructor(uint256 initialSupply, address[] memory defaultOperators)
    public
    ERC777("Unstopable Information", "UFO", defaultOperators)
  {
    _mint(msg.sender, initialSupply * 10 ** 18, "", "");
  }
}