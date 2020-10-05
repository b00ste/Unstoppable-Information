// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

contract Storage
{
  //creating a sruct with all properties of a survey and saving all the properties of a survey in a mapping
  struct Survey
  {
    mapping (string => uint256) _uintStorage;
    mapping (string => string) _stringStorage;
    mapping (string => string[]) _stringArrayStorage;
    mapping (string => bool) _boolStorage;
    mapping (string => address) _addressStorage;
    mapping (string => bytes4) _bytesStorage;
  }
  mapping (string => Survey) internal _surveyStorage;

  //creating a sruct with all properties of a poll and saving all the properties of a poll in a mapping
  struct Poll
  {
    mapping (string => uint256) _uintStorage;
    mapping (string => string) _stringStorage;
    mapping (string => string[]) _stringArrayStorage;
    mapping (string => bool) _boolStorage;
    mapping (string => address) _addressStorage;
    mapping (string => bytes4) _bytesStorage;
  }
  mapping (string => Poll) internal _pollStorage;

  //struct with user properties with a mapping saving info about all users
  struct User
  {
    mapping (string => uint256) _uintStorage;
    mapping (string => string) _stringStorage;
    mapping (string => string[]) _stringArrayStorage;
    mapping (string => bool) _boolStorage;
    mapping (string => address) _addressStorage;
    mapping (string => bytes4) _bytesStorage;

    mapping (uint256 => string) surevysTitles;
    mapping (uint256 => string) pollTitles;
  }
  mapping (address => User) internal _userStorage;

  //an array of strings, titles of surveys and titles of polls
  string[] internal polls;

  //saving the surveys at which a certain user did participate
  mapping (address => mapping (string => bool)) internal userParticipatedSurveys;

  //saving the polls at which a certain user did participate
  mapping (address => mapping (string => bool)) internal userParticipatedPolls;

  //setting all possible variables needed in future
  mapping (string => uint256) internal _uintStorage;
  mapping (string => string) internal _stringStorage;
  mapping (string => string[]) internal _stringArrayStorage;
  mapping (string => bool) internal _boolStorage;
  mapping (string => address) internal _addressStorage;
  mapping (string => bytes4) internal _bytesStorage;

  //survey properties getters
  function getSurveyName(uint256 _ofNumber) public view returns(string memory)
  {
    return(_stringArrayStorage['surveys'][_ofNumber]);
  }
  function getSurveyQuestions(string memory _name) public view returns(string memory)
  {
    return(_surveyStorage[_name]._stringStorage['questions']);
  }
  function getSurveyParticipantsAllowed(string memory _name) public view returns(uint256)
  {
    return(_surveyStorage[_name]._uintStorage['participantsAllowed']);
  }
  function getSurveyTotalParticipants(string memory _name) public view returns(uint256)
  {
    return(_surveyStorage[_name]._uintStorage['totalParticipated']);
  }
  function getSurveyAnswers(string memory _name, uint256 _ofNumber) public view returns(string memory)
  {
    return(_surveyStorage[_name]._stringArrayStorage['answers'][_ofNumber]);
  }
  function getSurveyValue(string memory _name) public view returns(uint256)
  {
    return(_surveyStorage[_name]._uintStorage['value']);
  }
  function getSurveyStoppedStatus(string memory _name) public view returns(bool)
  {
    return(_surveyStorage[_name]._boolStorage['stoppedStatus']);
  }
  function getSurveyOwner(string memory _name) public view returns(address)
  {
    return(_surveyStorage[_name]._addressStorage['surveyOwner']);
  }

  //poll properties getters
  function getPollName(uint256 _ofNumber) public view returns(string memory)
  {
    return(_stringArrayStorage['polls'][_ofNumber]);
  }
  function getPollChoices(string memory _name) public view returns(string memory)
  {
    return(_pollStorage[_name]._stringStorage['choices']);
  }
  function getPollParticipantsAllowed(string memory _name) public view returns(uint256)
  {
    return(_pollStorage[_name]._uintStorage['participantsAllowed']);
  }
  function getPollTotalParticipants(string memory _name) public view returns(uint256)
  {
    return(_pollStorage[_name]._uintStorage['totalParticipated']);
  }
  function getPollChoiceVotes(string memory _name, string memory _choice) public view returns(uint256)
  {
    return(_pollStorage[_name]._uintStorage[_choice]);
  }
  function getPollValue(string memory _name) public view returns(uint256)
  {
    return(_pollStorage[_name]._uintStorage['value']);
  }
  function getPollStoppedStatus(string memory _name) public view returns(bool)
  {
    return(_pollStorage[_name]._boolStorage['stoppedStatus']);
  }
  function getPollOwner(string memory _name) public view returns(address)
  {
    return(_pollStorage[_name]._addressStorage['pollOwner']);
  }

  //storage getters
  function getUintStorage(string memory _valueName) public view returns(uint256)
  {
    return(_uintStorage[_valueName]);
  }

  //user properties getteres
  function getUserCreatedSurveys() public view returns(uint256)
  {
    return(_userStorage[msg.sender]._uintStorage['surveysCreated']);
  }
  function getUserNumberOfSurveys(uint256 _index) public view returns(string memory)
  {
    return(_userStorage[msg.sender].surevysTitles[_index]);
  }
  function getUserCreatedPolls() public view returns(uint256)
  {
    return(_userStorage[msg.sender]._uintStorage['pollsCreated']);
  }
  function getUserNumberOfPolls(uint256 _index) public view returns(string memory)
  {
    return(_userStorage[msg.sender].pollTitles[_index]);
  }
}
