// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "./Storage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC777/IERC777.sol";
import "@openzeppelin/contracts/introspection/IERC1820Registry.sol";
import "@openzeppelin/contracts/token/ERC777/IERC777Recipient.sol";

contract SurveyProxy is Storage, Ownable
{
//ERC777 emplementation + recipients

  address private funcAddress;

  IERC1820Registry private _erc1820 = IERC1820Registry(
		0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24
	);
	bytes32 private constant TOKENS_RECIPIENT_INTERFACE_HASH = keccak256(
		"ERC777TokensRecipient"
	);

	IERC777 private _token;

	event DoneStuff(
		address operator,
		address from,
		address to,
		uint256 amount,
		bytes userData,
		bytes operatorData
	);

	constructor(address token, address _funcAddress) public {
		_token = IERC777(token);
    funcAddress =_funcAddress;

		_erc1820.setInterfaceImplementer(
				address(this),
				TOKENS_RECIPIENT_INTERFACE_HASH,
				address(this)
		);
	}

	function tokensReceived(
		address operator,
		address from,
		address to,
		uint256 amount,
		bytes calldata userData,
		bytes calldata operatorData
	) external {
		require(
				msg.sender == address(_token),
				"Simple777Recipient: Invalid token"
		);

		// do stuff
		emit DoneStuff(operator, from, to, amount, userData, operatorData);
	}

  function updateFunc(address _newAddress) onlyOwner public
  {
    funcAddress = _newAddress;
  }

//FALLBACK function
  fallback() payable external
  {
    //Redirect to funcAddress
    address implementation = funcAddress;
    require(funcAddress != address(0));
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
