var FunctionalSurveys = artifacts.require("FunctionalSurveys");
var ProxySurveys = artifacts.require("ProxySurveys");

module.exports = async function(deployer, network, accounts) {
  const functionalSurveys = await FunctionalSurveys.new();
  const proxySurveys = await ProxySurveys.new(functionalSurveys.address);
  console.log(proxySurveys.address);
};
