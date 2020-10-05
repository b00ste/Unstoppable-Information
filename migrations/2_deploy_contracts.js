var SurveyFunc = artifacts.require("SurveyFunc");
var SurveyProxy = artifacts.require("SurveyProxy");

var PollFunc = artifacts.require("PollFunc");
var PollProxy = artifacts.require("PollProxy");
var Token = artifacts.require("Token");

module.exports = async function(deployer, network, accounts) {

  let approvedContracts = [];
  await deployer.deploy(Token, 1000, approvedContracts);
  const token = await Token.deployed();

  await deployer.deploy(SurveyFunc, token.address);
  const surveyFunc = await SurveyFunc.deployed();

  await deployer.deploy(SurveyProxy, token.address, surveyFunc.address);
  const surveyProxy = await SurveyProxy.deployed();

  await deployer.deploy(PollFunc, token.address);
  const pollFunc = await PollFunc.deployed();

  await deployer.deploy(PollProxy, token.address, pollFunc.address);
  const pollProxy = await PollProxy.deployed();

};
