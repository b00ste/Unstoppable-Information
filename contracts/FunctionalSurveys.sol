// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./StorageSurveys.sol";
import "./TokenSurveys.sol";


contract FunctionalSurveys is Ownable, StorageSurveys, TokenSurveys(1000)
{
// Initializing the contract

  constructor() public
  {
    initialize();
  }

  function initialize() public
  {
    require(!_initialized);
    _uintStorage['totalSurveys'] = 0;
    _initialized = true;
  }

// Events

  event surveyNumber(uint256 nr);

// General app functions

  function setSurvey(string memory _name, string memory _questions, uint256 _participantsAllowed, uint256 _valueOfSurvey) public payable
  {
    //saving the value of survey with 18 decimals
    uint256 _actualValueOfSurvey = _valueOfSurvey * (10**18);
    //require that every user that participates at the survey gets at least 0.0001 coins
    require(_actualValueOfSurvey/_participantsAllowed >= 10**14);
    address msgSender = msg.sender;
    //saving the new survey name to the array and saving the total number of surveys
    surveys.push(_name);
    _uintStorage['totalSurveys']++;
    //creating a survey with it's properties
    surveyProps[_name].surveyOwner = msgSender;
    surveyProps[_name].questions = _questions;
    surveyProps[_name].stoppedStatus = false;
    surveyProps[_name].valueOfSurvey = _actualValueOfSurvey - _actualValueOfSurvey/100*10;
    surveyProps[_name].participantsAllowed = _participantsAllowed;
    surveyProps[_name].totalParticipants = 0;
    //creating user account
    userInfo[msgSender].surevysTitles[userInfo[msgSender].surveysCreated] = _name;
    userInfo[msgSender].surveysCreated++;
    //sending the rewards to the creator of the contract and setting the value of the survey
    _transfer(msgSender, Ownable.owner(), _actualValueOfSurvey/100*10);
    _transfer(msgSender, address(this), surveyProps[_name].valueOfSurvey);
    //emiting the number of the survey in the array of surveys
    emit surveyNumber(surveys.length - 1);
  }

  function answerSurvey(string memory _name, string memory _answers) public
  {
    //if the free slots for participation at this survey are filled stop the contract
    if(surveyProps[_name].totalParticipants == surveyProps[_name].participantsAllowed) surveyProps[_name].stoppedStatus = true;
    //require that the survey hase participation slots free and didn't stop
    require(!surveyProps[_name].stoppedStatus);
    //require that the user didn't participate at this survey and setting it's participation
    require(!userParticipated[msg.sender][_name]);
    userParticipated[msg.sender][_name] = true;
    //setting new answers to the survey and updating the number of participants
    surveyProps[_name].answers.push(_answers);
    surveyProps[_name].totalParticipants++;
    //sending the rewards for participating at the survey
    _transfer(address(this), msg.sender, surveyProps[_name].valueOfSurvey / surveyProps[_name].participantsAllowed);
  }

  /*function vote(string memory _name, string memory _choice) public
  {
    require(!surveyProps[_name].stoppedStatus);
    require(!userVotes[msg.sender][_name]);
    surveyProps[_name].votesOfEachChoice[_choice].push(msg.sender);
    surveyProps[_name].votedTimes++;
    userVotes[msg.sender][_name] = true;
    assert(userVotes[msg.sender][_name]);
    _transfer(address(this), msg.sender, surveyProps[_name].valueOfSurvey / surveyProps[_name].possibleVotes);
    if(surveyProps[_name].votedTimes == surveyProps[_name].possibleVotes) surveyProps[_name].stoppedStatus = true;
  }*/

}
