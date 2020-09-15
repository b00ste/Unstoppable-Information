// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./StorageSurveys.sol";

contract FunctionalSurveys is StorageSurveys, ERC20, Ownable
{
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

  function getSurveys() public view returns(string[] memory)
  {
    return(questions);
  }

  function getChoices(string memory _name) public view returns(string[] memory)
  {
    return(surveyProps[_name].choices);
  }

  function getVotes(string memory _name, string memory _choice) public view returns(uint256, address[] memory)
  {
    return(surveyProps[_name].votesOfEachChoice[_choice].length, surveyProps[_name].votesOfEachChoice[_choice]);
  }

  function setSurevey(string memory _name, string[] memory _choices, uint256 _possibleVotes, uint256 _valueOfSurvey) public payable
  {
    uint256 _actualValueOfSurvey = _valueOfSurvey * (10**18);
    require(_actualValueOfSurvey/_possibleVotes >= 10**14);
    address msgSender = msg.sender;
    questions.push(_name);
    surveyProps[_name].surveyOwner = msg.sender;
    surveyProps[_name].choices = _choices;
    surveyProps[_name].stoppedStatus = false;
    surveyProps[_name].valueOfSurvey = _actualValueOfSurvey - _actualValueOfSurvey/100*10;
    surveyProps[_name].possibleVotes = _possibleVotes;
    surveyProps[_name].votedTimes = 0;
    _transfer(msgSender, Ownable.owner(), _actualValueOfSurvey/100*10);
    _transfer(msgSender, address(this), surveyProps[_name].valueOfSurvey);
  }

  /*function toggleStopOfSurvey(string memory _name) public
  {
      require(msg.sender == surveyProps[_name].surveyOwner);
      surveyProps[_name].stoppedStatus = !surveyProps[_name].stoppedStatus;
  }*/

  function vote(string memory _name, string memory _choice) public
  {
    require(!surveyProps[_name].stoppedStatus);
    require(!userVotes[msg.sender][_name]);
    surveyProps[_name].votesOfEachChoice[_choice].push(msg.sender);
    surveyProps[_name].votedTimes++;
    userVotes[msg.sender][_name] = true;
    assert(userVotes[msg.sender][_name]);
    _transfer(address(this), msg.sender, surveyProps[_name].valueOfSurvey / surveyProps[_name].possibleVotes);
    if(surveyProps[_name].votedTimes == surveyProps[_name].possibleVotes) surveyProps[_name].stoppedStatus = true;
  }

}
