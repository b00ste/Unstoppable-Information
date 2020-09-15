// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./StorageSurveys.sol";

contract FunctionalSurveys is StorageSurveys, ERC20, Ownable
{
// Initializing the contract

  constructor(uint256 initialSupply) public ERC20("SurveyToken", "SVT")
  {
    initialize(initialSupply);
  }

  function initialize(uint256 initialSupply) public
  {
    require(!_initialized);
    uint internalInitialSupply = initialSupply * (10 ** 18);
    _mint(msg.sender, internalInitialSupply);
    _initialized = true;
  }

// Events

  event surveyNumber(uint256 nr);

// General app functions

  function getSurveyName(uint256 _ofNumber) public view returns(string memory)
  {
    return(surveys[_ofNumber]);
  }

  function getChoices(string memory _name) public view returns(string memory)
  {
    return(surveyProps[_name].questions);
  }

  function setSurevey(string memory _name, string memory _questions, uint256 _participantsAllowed, uint256 _valueOfSurvey) public payable
  {
    uint256 _actualValueOfSurvey = _valueOfSurvey * (10**18);
    require(_actualValueOfSurvey/_participantsAllowed >= 10**14);
    address msgSender = msg.sender;
    surveys.push(_name);
    surveyProps[_name].surveyOwner = msg.sender;
    surveyProps[_name].questions = _questions;
    surveyProps[_name].stoppedStatus = false;
    surveyProps[_name].valueOfSurvey = _actualValueOfSurvey - _actualValueOfSurvey/100*10;
    surveyProps[_name].participantsAllowed = _participantsAllowed;
    surveyProps[_name].totalParticipants = 0;
    _transfer(msgSender, Ownable.owner(), _actualValueOfSurvey/100*10);
    _transfer(msgSender, address(this), surveyProps[_name].valueOfSurvey);
    emit surveyNumber(surveys.length);
  }

  function setAnswers(string memory _name, string memory _answers) public
  {
    require(!userVotes[msg.sender][_name]);
    userVotes[msg.sender][_name] = true;
    require(!surveyProps[_name].stoppedStatus);
    surveyProps[_name].answers = _answers;
    surveyProps[_name].totalParticipants++;
    _transfer(address(this), msg.sender, surveyProps[_name].valueOfSurvey / surveyProps[_name].participantsAllowed);
    if(surveyProps[_name].totalParticipants == surveyProps[_name].participantsAllowed) surveyProps[_name].stoppedStatus = true;
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
