// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./StorageSurveys.sol";
import "./TokenSurveys.sol";

contract ProxySurveys is Ownable, StorageSurveys, TokenSurveys(1000)
{
  address currentAddress;

  constructor(address _currentAddress) public
  {
    currentAddress = _currentAddress;
  }

  function update(address _newAddress) onlyOwner public
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
