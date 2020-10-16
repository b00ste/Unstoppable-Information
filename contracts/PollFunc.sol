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

  function setPoll(bytes32 _name, bytes32[] memory _choices, uint256 _maxParticipants, uint256 _valueOfPoll) public
  {
    require(_valueOfPoll/_maxParticipants >= 10 ** 14, "Participant's bounty should be bigger"); //participants bounty >= 0.0001
    _stringToBytes32ArrayStorage['polls'].push(_name); //save new poll name
    require(!_pollStorage[_name]._boolStorage['initialized'], "There is another poll with te same name"); //create unique polls
    _pollStorage[_name]._boolStorage['initialized'] = true; //initialize the poll
    _pollStorage[_name]._stringToBytes32ArrayStorage['choices'] = _choices; //save choices
    _pollStorage[_name]._addressStorage['owner'] = msg.sender; //save owner
    _pollStorage[_name]._boolStorage['stoppedStatus'] = false; //set stop status for new poll
    _pollStorage[_name]._uintStorage['value'] = _valueOfPoll; //set the value of poll in UFO tokens
    _pollStorage[_name]._uintStorage['maxParticipants'] = _maxParticipants; //set max participants allowed
    _pollStorage[_name]._uintStorage['totalParticipated'] = 0; //set total participants for new poll
    _pollStorage[_name]._uintStorage['pollIndexInAllPollsArray'] = _stringToBytes32ArrayStorage['polls'].length - 1; //set index in all polls array
    _userStorage[msg.sender]._stringToBytes32ArrayStorage['polls'].push(_name); //add new poll to user account
    _pollStorage[_name]._uintStorage['pollIndexInUserCreatedPollsArray'] = _userStorage[msg.sender]._stringToBytes32ArrayStorage['polls'].length - 1; //set index in user created polls array
    _token.operatorSend(msg.sender, address(this), _valueOfPoll, "", ""); //send tokens to Smart Contract
    emit pollNumber(_stringToBytes32ArrayStorage['polls'].length); //emit total number of poll
  }

  function pollParticipation(bytes32 _name, bytes32 _choice) public
  {
    require(!_pollStorage[_name]._boolStorage['stoppedStatus']); //require that the poll is still active
    require(!_userStorage[msg.sender].participatedPolls[_name]); //require that the user did not participate at this poll
    require(_pollStorage[_name]._addressStorage['owner'] != msg.sender); //the owner cannot participate at his poll
    bool found = false;
    for(uint i = 0; !found && i < _pollStorage[_name]._stringToBytes32ArrayStorage['choices'].length; i++) {
      if(_pollStorage[_name]._stringToBytes32ArrayStorage['choices'][i] == _choice) {
        found = true; //check if user's choice is valid for this poll
      }
    }
    require(found == true, "Your choice is not valid in this poll");
    _userStorage[msg.sender].participatedPolls[_name] = true; //set participation
    _pollStorage[_name]._uintStorage['totalParticipated']++; //increase participants
    if(_pollStorage[_name]._uintStorage['maxParticipants'] == _pollStorage[_name]._uintStorage['totalParticipated']) {
      _pollStorage[_name]._boolStorage['stoppedStatus'] = true; //if max participants number is reached, stop the poll
    }
    _pollStorage[_name]._bytes32ToUintStorage[_choice]++; //add new vote
    uint256 _dappCreatorsReward = (_pollStorage[_name]._uintStorage['value'] / _pollStorage[_name]._uintStorage['maxParticipants'])/10;
    _token.operatorSend(address(this), Ownable.owner(), _dappCreatorsReward, '', ''); //send rewards to owner
    _token.operatorSend(address(this), msg.sender, _dappCreatorsReward * 9, '', ''); //send bounty to participants
  }

  function deletePoll(bytes32 _name) public
  {
    require(_pollStorage[_name]._addressStorage['owner'] == msg.sender); //only the owner of the poll can delete the poll
    //delete the poll
    delete _pollStorage[_name]._boolStorage['initialized'];
    for(uint256 i = 0; i < _pollStorage[_name]._stringToBytes32ArrayStorage['choices'].length; i++) {
      delete _pollStorage[_name]._stringToBytes32ArrayStorage['choices'][i];
    }
    delete _pollStorage[_name]._stringToBytes32ArrayStorage['choices'];
    delete _pollStorage[_name]._addressStorage['owner'];
    delete _pollStorage[_name]._boolStorage['stoppedStatus'];
    delete _pollStorage[_name]._uintStorage['value'];
    delete _pollStorage[_name]._uintStorage['maxParticipants'];
    delete _pollStorage[_name]._uintStorage['totalParticipated'];
    for (uint256 i = _pollStorage[_name]._uintStorage['pollIndexInAllPollsArray']; i < _stringToBytes32ArrayStorage['polls'].length - 1; i++) {
      _stringToBytes32ArrayStorage['polls'][i] = _stringToBytes32ArrayStorage['polls'][i + 1];
    }
    _stringToBytes32ArrayStorage['polls'].pop();
    delete _pollStorage[_name]._uintStorage['pollIndexInAllPollsArray'];
    for (uint256 i = _pollStorage[_name]._uintStorage['pollIndexInUserCreatedPollsArray']; i < _userStorage[msg.sender]._stringToBytes32ArrayStorage['polls'].length - 1; i++) {
      _userStorage[msg.sender]._stringToBytes32ArrayStorage['polls'][i] = _userStorage[msg.sender]._stringToBytes32ArrayStorage['polls'][i + 1];
    }
    _userStorage[msg.sender]._stringToBytes32ArrayStorage['polls'].pop();
    delete _pollStorage[_name]._uintStorage['pollIndexInUserCreatedPollsArray'];
    delete _pollStorage[_name];
  }

}
