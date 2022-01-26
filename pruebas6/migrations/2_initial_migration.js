const MyntfContract = artifacts.require("NftBuySucess");

module.exports = function (deployer) {
  deployer.deploy(MyntfContract,"Paco", "Rca",50000000000000);
};