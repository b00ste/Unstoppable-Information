var FunctionalSurveys = artifacts.require("FunctionalSurveys");
var ProxySurveys = artifacts.require("ProxySurveys");

module.exports = async function(deployer, network, accounts) {
  //deploying contracts
  //deployer.deploy(FunctionalSurveys, 1000);
  const functionalSurveys = await FunctionalSurveys.new(1000);
  console.log(functionalSurveys.address);
  const proxySurveys = await ProxySurveys.new(functionalSurveys.address, 1000);

  //deployer.deploy(ProxySurveys, functionalSurveys.address, 1000);
  //let proxySurveys = await ProxySurveys.deployed();

  //crewating an instance that sends the function through proxySurveys to functionalSurveys
  //in this way the function from functionalSurveys is executed inside proxySurveys using the variables from proxySurveys
  const proxyToFunctionalSurveys = await FunctionalSurveys.at(proxySurveys.address);

  await proxyToFunctionalSurveys.transfer(accounts[1], web3.utils.toWei("100", "ether"), {from: accounts[0]});
  var ownerBalance = await proxyToFunctionalSurveys.balanceOf(await proxyToFunctionalSurveys.owner());
  console.log(ownerBalance/(10**18));

  var creatorBalance = await proxyToFunctionalSurveys.balanceOf(accounts[1]);
  console.log(creatorBalance/(10**18));

  await proxyToFunctionalSurveys.setSurevey("president", ["trump", "putin"], 100, 100, {from: accounts[1]});

  var allSurveys = await proxyToFunctionalSurveys.getSurveys();
  console.log(allSurveys);
  var presidentSurvey = await proxyToFunctionalSurveys.getChoices("president");
  console.log(presidentSurvey);
  ownerBalance = await proxyToFunctionalSurveys.balanceOf(await proxyToFunctionalSurveys.owner());
  console.log(ownerBalance/(10**18));
  await proxyToFunctionalSurveys.vote("president", "putin", {from: accounts[2]});
  creatorBalance = await proxyToFunctionalSurveys.balanceOf(accounts[1]);
  console.log(creatorBalance/(10**18));
  var contractBalance = await proxyToFunctionalSurveys.balanceOf(proxySurveys.address);
  console.log(contractBalance/(10**18));
  var voterBalance = await proxyToFunctionalSurveys.balanceOf(accounts[2]);
  console.log(voterBalance/(10**18));
};
