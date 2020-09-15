// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

contract StorageSurveys
{
  struct Survey
  {
    address surveyOwner;
    string[] choices;
    bool stoppedStatus;
    uint256 valueOfSurvey;
    uint256 possibleVotes;
    uint256 votedTimes;
    mapping (string => address[]) votesOfEachChoice;
  }

  //an array of strings, titles of surveys
  string[] internal questions;

  //saving the surveys at which a certain user did participate
  mapping (address => mapping (string => bool)) internal userVotes;

  //saving all the properties of a survey
  mapping (string => Survey) internal surveyProps;

  //setting all possible variables needed in future
  mapping (string => uint256) _uintStorage;
  mapping (string => string) _stringStorage;
  mapping (string => bool) _boolStorage;
  mapping (string => address) _addressStorage;
  mapping (string => bytes4) _bytesStorage;

  bool public _initialized;
}
