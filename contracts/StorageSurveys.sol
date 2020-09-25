// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

contract StorageSurveys
{
  //creating a sruct with all properties of a survey and saving all the properties of a survey in a mapping
  struct Survey
  {
    address surveyOwner;
    string questions;
    string[] answers;
    bool stoppedStatus;
    uint256 valueOfSurvey;
    uint256 participantsAllowed;
    uint256 totalParticipants;
  }
  mapping (string => Survey) internal surveyProps;

  //
  struct User
  {
    uint256 surveysCreated;
    mapping (uint256 => string) surevysTitles;
  }
  mapping (address => User) internal userInfo;

  //an array of strings, titles of surveys
  string[] internal surveys;

  //saving the surveys at which a certain user did participate
  mapping (address => mapping (string => bool)) internal userParticipated;

  //setting all possible variables needed in future
  mapping (string => uint256) internal _uintStorage;
  mapping (string => string) internal _stringStorage;
  mapping (string => bool) internal _boolStorage;
  mapping (string => address) internal _addressStorage;
  mapping (string => bytes4) internal _bytesStorage;

  bool public _initialized;

  function getSurveyName(uint256 _ofNumber) public view returns(string memory)
  {
    return(surveys[_ofNumber]);
  }
  function getSurveyQuestions(string memory _name) public view returns(string memory)
  {
    return(surveyProps[_name].questions);
  }
  function getParticipantsAllowed(string memory _name) public view returns(uint256)
  {
    return(surveyProps[_name].participantsAllowed);
  }
  function getSurveyTotalParticipants(string memory _name) public view returns(uint256)
  {
    return(surveyProps[_name].totalParticipants);
  }
  function getSurveyAnswers(string memory _name, uint256 _ofNumber) public view returns(string memory)
  {
    return(surveyProps[_name].answers[_ofNumber]);
  }

  function getUintStorage(string memory _valueName) public view returns(uint256)
  {
    return(_uintStorage[_valueName]);
  }

  function getUserCreatedSurveys() public view returns(uint256)
  {
    return(userInfo[msg.sender].surveysCreated);
  }
  function getUserSurveyOfNumber(uint256 _index) public view returns(string memory)
  {
    return(userInfo[msg.sender].surevysTitles[_index]);
  }
}
