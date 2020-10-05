// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "./Storage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC777/IERC777.sol";
import "@openzeppelin/contracts/introspection/IERC1820Registry.sol";
import "@openzeppelin/contracts/token/ERC777/IERC777Recipient.sol";


contract SurveyFunc is Storage, Ownable
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

  event surveyNumber(uint256 nr);

// General app functions

  function setSurvey(string memory _name, string memory _questions, uint256 _participantsAllowed, uint256 _valueOfSurvey) public payable
  {
    //saving the value of survey with 18 decimals
    uint256 _actualValueOfSurvey = _valueOfSurvey * (10 ** 18);
    //require that every user that participates at the survey gets at least 0.0001 coins
    require(_actualValueOfSurvey/_participantsAllowed >= 10 ** 14);
    address msgSender = msg.sender;
    //saving the new survey name to the array and saving the total number of surveys
    _stringArrayStorage['surveys'].push(_name);
    _uintStorage['totalSurveys']++;
    //creating a survey with it's properties
    _surveyStorage[_name]._addressStorage['surveyOwner'] = msgSender;
    _surveyStorage[_name]._stringStorage['questions'] = _questions;
    _surveyStorage[_name]._boolStorage['stoppedStatus'] = false;
    _surveyStorage[_name]._uintStorage['value'] = _actualValueOfSurvey - _actualValueOfSurvey/10;
    _surveyStorage[_name]._uintStorage['participantsAllowed'] = _participantsAllowed;
    _surveyStorage[_name]._uintStorage['totalParticipated'] = 0;
    //creating user account
    _userStorage[msgSender].surevysTitles[_userStorage[msgSender]._uintStorage['surveysCreated']] = _name;
    _userStorage[msgSender]._uintStorage['surveysCreated']++;
    //sending the rewards to the creator of the contract and setting the value of the survey
    _token.operatorSend(msgSender, address(this), _actualValueOfSurvey, "", "");
    _token.operatorSend(msgSender, Ownable.owner(), _actualValueOfSurvey/10, "", "");
    //emiting the number of the survey in the array of surveys
    emit surveyNumber(_stringArrayStorage['surveys'].length - 1);
  }

  function surveyParticipation(string memory _name, string memory _answers) public
  {
    //require that the survey has participation slots free and didn't stop
    require(!_surveyStorage[_name]._boolStorage['stoppedStatus']);
    //require that the user didn't participate at this survey and setting it's participation
    require(!userParticipatedSurveys[msg.sender][_name]);
    userParticipatedSurveys[msg.sender][_name] = true;
    //updating the number of participants
    _surveyStorage[_name]._uintStorage['totalParticipated']++;
    //if the free slots for participation at this survey are filled stop the contract
    if(_surveyStorage[_name]._uintStorage['totalParticipated'] == _surveyStorage[_name]._uintStorage['participantsAllowed']) _surveyStorage[_name]._boolStorage['stoppedStatus'] = true;
    //setting new answers to the survey
    _surveyStorage[_name]._stringArrayStorage['answers'].push(_answers);
    //sending the rewards for participating at the survey
    _token.operatorSend(address(this), msg.sender, _surveyStorage[_name]._uintStorage['value'] / _surveyStorage[_name]._uintStorage['participantsAllowed'], '', '');
  }

}
