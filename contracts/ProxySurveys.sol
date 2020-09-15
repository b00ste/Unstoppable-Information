// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./StorageSurveys.sol";

contract ProxySurveys is StorageSurveys, ERC20, Ownable
{
  address currentAddress;

  constructor(address _currentAddress, uint256 initialSupply) public ERC20("SurveyToken", "SVT")
  {
    currentAddress = _currentAddress;
    uint internalInitialSupply = initialSupply * (10 ** 18);
    _mint(msg.sender, internalInitialSupply);
  }

  function update(address _newAddress) public
  {
    currentAddress = _newAddress;
  }

  //FALLBACK function
  fallback() payable external
  {
    //Redirect to currentAddress
    address implementation = currentAddress;
    require(currentAddress != address(0));
    bytes memory data = msg.data;

    assembly
    {
      let result := delegatecall(gas(), implementation, add(data, 0x20), mload(data), 0, 0)
      let size := returndatasize()
      let ptr := mload(0x40)
      returndatacopy(ptr, 0, size)
      switch result
      case 0 {revert(ptr, size)}
      default {return(ptr, size)}
    }
  }
}
