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

  function setSurvey(bytes32 _name, bytes32[] memory _questions, uint256 _maxParticipants, uint256 _valueOfSurvey) public
  {
    require(_valueOfSurvey/_maxParticipants >= 10 ** 14, "Participant's bounty should be bigger"); //participants bounty >= 0.0001
    _stringToBytes32ArrayStorage['surveys'].push(_name); //save new survey name
    require(!_surveyStorage[_name]._boolStorage['initialized'], "There is another survey with te same name"); //create unique surveys
    _surveyStorage[_name]._boolStorage['initialized'] = true; //initialize the survey
    _surveyStorage[_name]._stringToBytes32ArrayStorage['questions'] = _questions; //save questions
    _surveyStorage[_name]._addressStorage['owner'] = msg.sender; //save owner
    _surveyStorage[_name]._boolStorage['stoppedStatus'] = false; //set stop status for new survey
    _surveyStorage[_name]._uintStorage['value'] = _valueOfSurvey; //set the value of survey in UFO tokens
    _surveyStorage[_name]._uintStorage['maxParticipants'] = _maxParticipants; //set max participants allowed
    _surveyStorage[_name]._uintStorage['totalParticipated'] = 0; //set total participants for new survey
    _surveyStorage[_name]._uintStorage['surveyIndexInAllSurveysArray'] = _stringToBytes32ArrayStorage['surveys'].length - 1; //set index in all surveys array
    _userStorage[msg.sender]._stringToBytes32ArrayStorage['surveys'].push(_name); //add new survey to user account
    _surveyStorage[_name]._uintStorage['surveyIndexInUserCreatedSurveysArray'] = _userStorage[msg.sender]._stringToBytes32ArrayStorage['surveys'].length - 1; //set index in user created surveys array
    _token.operatorSend(msg.sender, address(this), _valueOfSurvey, "", ""); //send tokens to Smart Contract
    emit surveyNumber(_stringToBytes32ArrayStorage['surveys'].length); //emit total number of surveys
  }

  function surveyParticipation(bytes32 _name, bytes32[] memory _answers) public
  {
    require(!_surveyStorage[_name]._boolStorage['stoppedStatus']); //require that the survey is still active
    require(!_userStorage[msg.sender].participatedSurveys[_name]); //require that the user did not participate at this survey
    require(_surveyStorage[_name]._addressStorage['owner'] != msg.sender); //the owner cannot participate at his survey
    _userStorage[msg.sender].participatedSurveys[_name] = true; //set participation
    _surveyStorage[_name]._uintStorage['totalParticipated']++; //increase participants
    if(_surveyStorage[_name]._uintStorage['maxParticipants'] == _surveyStorage[_name]._uintStorage['totalParticipated']) {
      _surveyStorage[_name]._boolStorage['stoppedStatus'] = true; //if max participants number is reached, stop the survey
    }
    _surveyStorage[_name]._uintToBytes32ArrayStorage[(_surveyStorage[_name]._uintStorage['totalParticipated'] - 1)] = _answers; //add new answers
    uint256 _dappCreatorsReward = (_surveyStorage[_name]._uintStorage['value'] / _surveyStorage[_name]._uintStorage['participantsAllowed'])/10;
    _token.operatorSend(address(this), Ownable.owner(), _dappCreatorsReward, '', ''); //send rewards to owner
    _token.operatorSend(address(this), msg.sender, _dappCreatorsReward * 9, '', ''); //send bounty to participants
  }

  function deleteSurvey(bytes32 _name) public
  {
    require(_surveyStorage[_name]._addressStorage['owner'] == msg.sender); //only the owner of the survey can delete the survey
    //delete the survey
    delete _surveyStorage[_name]._boolStorage['initialized'];
    for (uint256 i = 0; i < _surveyStorage[_name]._uintStorage['totalParticipated']; i++) {
      for (uint256 j = 0; j < _surveyStorage[_name]._stringToBytes32ArrayStorage['questions'].length; j++) {
        delete _surveyStorage[_name]._uintToBytes32ArrayStorage[i][j];
      }
      delete _surveyStorage[_name]._uintToBytes32ArrayStorage[i];
    }
    delete _surveyStorage[_name]._stringToBytes32ArrayStorage['questions'];
    delete _surveyStorage[_name]._addressStorage['owner'];
    delete _surveyStorage[_name]._boolStorage['stoppedStatus'];
    delete _surveyStorage[_name]._uintStorage['value'];
    delete _surveyStorage[_name]._uintStorage['maxParticipants'];
    delete _surveyStorage[_name]._uintStorage['totalParticipated'];
    for (uint256 i = _surveyStorage[_name]._uintStorage['surveyIndexInAllSurveysArray']; i < _stringToBytes32ArrayStorage['surveys'].length - 1; i++) {
      _stringToBytes32ArrayStorage['surveys'][i] = _stringToBytes32ArrayStorage['surveys'][i + 1];
    }
    _stringToBytes32ArrayStorage['surveys'].pop();
    delete _surveyStorage[_name]._uintStorage['surveyIndexInAllSurveysArray'];
    for (uint256 i = _surveyStorage[_name]._uintStorage['surveyIndexInUserCreatedSurveysArray']; i < _userStorage[msg.sender]._stringToBytes32ArrayStorage['surveys'].length - 1; i++) {
      _userStorage[msg.sender]._stringToBytes32ArrayStorage['surveys'][i] = _userStorage[msg.sender]._stringToBytes32ArrayStorage['surveys'][i + 1];
    }
    delete _surveyStorage[_name]._uintStorage['surveyIndexInUserCreatedSurveysArray'];
    delete _surveyStorage[_name];
  }

}
