// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

contract StorageSurveys
{
  //creating a sruct with all properties of a survey and saving all the properties of a survey in a mapping
  struct Survey
  {
    address surveyOwner;
    string questions;
    string answers;
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
  mapping (address => User) userInfo;

  //an array of strings, titles of surveys
  string[] internal surveys;

  //saving the surveys at which a certain user did participate
  mapping (address => mapping (string => bool)) internal userParticipated;

  //setting all possible variables needed in future
  mapping (string => uint256) _uintStorage;
  mapping (string => string) _stringStorage;
  mapping (string => bool) _boolStorage;
  mapping (string => address) _addressStorage;
  mapping (string => bytes4) _bytesStorage;

  bool public _initialized;

  function getUintStorage(string memory _valueName) public view returns(uint256)
  {
    return(_uintStorage[_valueName]);
  }
}
