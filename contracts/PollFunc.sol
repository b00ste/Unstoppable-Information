// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "./Storage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC777/IERC777.sol";
import "@openzeppelin/contracts/introspection/IERC1820Registry.sol";
import "@openzeppelin/contracts/token/ERC777/IERC777Recipient.sol";


contract PollFunc is Storage, Ownable
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

	constructor(address token) public {
		_token = IERC777(token);

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

// Events

  event pollNumber(uint256 nr);

// General app functions

  function setPoll(string memory _name, string memory _choices, uint256 _participantsAllowed, uint256 _valueOfPoll) public payable
  {
    //saving the value of survey with 18 decimals
    uint256 _actualValueOfPoll = _valueOfPoll * (10**18);
    //require that every user that participates at the survey gets at least 0.0001 coins
    require(_actualValueOfPoll/_participantsAllowed >= 10**14);
    address msgSender = msg.sender;
    //saving the new poll name to the array and saving the total number of polls
    _stringArrayStorage['polls'].push(_name);
    _uintStorage['totalPolls']++;
    //creating a poll with it's properties
    _pollStorage[_name]._addressStorage['pollOwner'] = msgSender;
    _pollStorage[_name]._stringStorage['choices'] = _choices;
    _pollStorage[_name]._boolStorage['stoppedStatus'] = false;
    _pollStorage[_name]._uintStorage['value'] = _actualValueOfPoll - _actualValueOfPoll/10;
    _pollStorage[_name]._uintStorage['participantsAllowed'] = _participantsAllowed;
    _pollStorage[_name]._uintStorage['totalParticipated'] = 0;
    //creating user account
    _userStorage[msgSender].pollTitles[_userStorage[msgSender]._uintStorage['pollsCreated']] = _name;
    _userStorage[msgSender]._uintStorage['pollsCreated']++;
    //sending the rewards to the creator of the contract and setting the value of the poll
    _token.operatorSend(msgSender, address(this), _actualValueOfPoll, "", "");
    _token.operatorSend(msgSender, Ownable.owner(), _actualValueOfPoll/10, "", "");
    //emiting the number of the poll in the array of polls
    emit pollNumber(_stringArrayStorage['polls'].length - 1);
  }

  function pollParticipation(string memory _name, string memory _choice) public
  {
    //require that the poll has participation slots free and didn't stop
    require(!_pollStorage[_name]._boolStorage['stoppedStatus']);
    //require that the user didn't participate at this poll and setting it's participation
    require(!userParticipatedPolls[msg.sender][_name]);
    userParticipatedPolls[msg.sender][_name] = true;
    //updating the number of participants
    _pollStorage[_name]._uintStorage['totalParticipated']++;
    //if the free slots for participation at this poll are filled stop the contract
    if(_pollStorage[_name]._uintStorage['totalParticipated'] == _pollStorage[_name]._uintStorage['participantsAllowed']) _pollStorage[_name]._boolStorage['stoppedStatus'] = true;
    //setting new votes to the survey
    _pollStorage[_name]._uintStorage[_choice]++;
    //sending the rewards for participating at the poll
    _token.operatorSend(address(this), msg.sender, _pollStorage[_name]._uintStorage['value'] / _pollStorage[_name]._uintStorage['participantsAllowed'], '', '');
  }

}
