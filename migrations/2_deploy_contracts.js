var FunctionalSurveys = artifacts.require("FunctionalSurveys");
var ProxySurveys = artifacts.require("ProxySurveys");

module.exports = async function(deployer, network, accounts) {
  const functionalSurveys = await FunctionalSurveys.new(1000);
  const proxySurveys = await ProxySurveys.new(functionalSurveys.address, 1000);
  console.log(proxySurveys.address);
};
