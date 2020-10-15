// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

contract Storage {
  //creating a sruct with all properties of a survey and saving all the properties of a survey in a mapping
  struct Survey
  {
    mapping (uint256 => bytes32[]) _uintToBytes32ArrayStorage;
    mapping (string => bytes32[]) _stringToBytes32ArrayStorage;
    mapping (bytes32 => uint256) _bytes32ToUintStorage;
    mapping (string => uint256) _uintStorage;
    mapping (string => string) _stringStorage;
    mapping (string => bool) _boolStorage;
    mapping (string => address) _addressStorage;
    mapping (string => bytes4) _bytesStorage;
  }
  mapping (bytes32 => Survey) internal _surveyStorage;

  //creating a sruct with all properties of a poll and saving all the properties of a poll in a mapping
  struct Poll
  {
    mapping (uint256 => bytes32[]) _uintToBytes32ArrayStorage;
    mapping (string => bytes32[]) _stringToBytes32ArrayStorage;
    mapping (bytes32 => uint256) _bytes32ToUintStorage;
    mapping (string => uint256) _uintStorage;
    mapping (string => string) _stringStorage;
    mapping (string => bool) _boolStorage;
    mapping (string => address) _addressStorage;
    mapping (string => bytes4) _bytesStorage;
  }
  mapping (bytes32 => Poll) internal _pollStorage;

  //struct with user properties with a mapping saving info about all users
  struct User
  {
    mapping (bytes32 => bool) participatedSurveys;
    mapping (bytes32 => bool) participatedPolls;

    mapping (string => bytes32[]) _stringToBytes32ArrayStorage;
    mapping (string => uint256) _uintStorage;
    mapping (string => string) _stringStorage;
    mapping (string => bool) _boolStorage;
    mapping (string => address) _addressStorage;
    mapping (string => bytes4) _bytesStorage;
  }
  mapping (address => User) internal _userStorage;

  //setting all possible variables needed in future
  mapping (string => bytes32[]) internal _stringToBytes32ArrayStorage;
  mapping (string => uint256) internal _uintStorage;
  mapping (string => string) internal _stringStorage;
  mapping (string => bool) internal _boolStorage;
  mapping (string => address) internal _addressStorage;
  mapping (string => bytes4) internal _bytesStorage;

  //getters for variables
  function getStringToBytes32ArrayStorrage(string memory _arrayName) public view returns(bytes32[] memory) {
    return (_stringToBytes32ArrayStorage[_arrayName]);
  }

  //getters for surveys
  function getSurveyUintStorage(bytes32 _surveyName, string memory _variableName) public view returns(uint) {
    return (_surveyStorage[_surveyName]._uintStorage[_variableName]);
  }
  function getSurveyStringStorage(bytes32 _surveyName, string memory _variableName) public view returns(string memory) {
    return (_surveyStorage[_surveyName]._stringStorage[_variableName]);
  }
  function getSurveyBoolStorage(bytes32 _surveyName, string memory _variableName) public view returns(bool) {
    return (_surveyStorage[_surveyName]._boolStorage[_variableName]);
  }
  function getSurveyAddressStorage(bytes32 _surveyName, string memory _variableName) public view returns(address) {
    return (_surveyStorage[_surveyName]._addressStorage[_variableName]);
  }
  function getSurveyStringToBytes32ArrayStorage(bytes32 _surveyName, string memory _variableName) public view returns(bytes32[] memory) {
    return (_surveyStorage[_surveyName]._stringToBytes32ArrayStorage[_variableName]);
  }
  function getSurveyUintToBytes32ArrayStorage(bytes32 _surveyName, uint256 _variableNumber) public view returns(bytes32[] memory) {
    return (_surveyStorage[_surveyName]._uintToBytes32ArrayStorage[_variableNumber]);
  }
  function getSurveyBytes32UintStorage(bytes32 _surveyName, bytes32 _variableName) public view returns(uint) {
    return (_surveyStorage[_surveyName]._bytes32ToUintStorage[_variableName]);
  }

  //getters for polls
  function getPollUintStorage(bytes32 _pollName, string memory _variableName) public view returns(uint) {
    return (_pollStorage[_pollName]._uintStorage[_variableName]);
  }
  function getPollStringStorage(bytes32 _pollName, string memory _variableName) public view returns(string memory) {
    return (_pollStorage[_pollName]._stringStorage[_variableName]);
  }
  function getPollBoolStorage(bytes32 _pollName, string memory _variableName) public view returns(bool) {
    return (_pollStorage[_pollName]._boolStorage[_variableName]);
  }
  function getPollAddressStorage(bytes32 _pollName, string memory _variableName) public view returns(address) {
    return (_pollStorage[_pollName]._addressStorage[_variableName]);
  }
  function getPollStringToBytes32ArrayStorage(bytes32 _pollName, string memory _variableName) public view returns(bytes32[] memory) {
    return (_pollStorage[_pollName]._stringToBytes32ArrayStorage[_variableName]);
  }
  function getPollUintToBytes32ArrayStorage(bytes32 _pollName, uint256 _variableNumber) public view returns(bytes32[] memory) {
    return (_pollStorage[_pollName]._uintToBytes32ArrayStorage[_variableNumber]);
  }
  function getPollBytes32UintStorage(bytes32 _pollName, bytes32 _variableName) public view returns(uint) {
    return (_pollStorage[_pollName]._bytes32ToUintStorage[_variableName]);
  }

  //getters for user
  function getUserStringToBytes32ArrayStorage(string memory _variableName) public view returns(bytes32[] memory) {
    return (_userStorage[msg.sender]._stringToBytes32ArrayStorage[_variableName]);
  }
  function getUserParticipatedSurveyStatus(bytes32 _surveyName) public view returns(bool) {
    return (_userStorage[msg.sender].participatedSurveys[_surveyName]);
  }
  function getUserParticipatedPollStatus(bytes32 _pollName) public view returns(bool) {
    return (_userStorage[msg.sender].participatedPolls[_pollName]);
  }

}
