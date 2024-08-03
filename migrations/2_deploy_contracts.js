const PetPower = artifacts.require("PetPower");

module.exports = async function (deployer, network, accounts) {
  const initialOwner = accounts[0];
  await deployer.deploy(PetPower, initialOwner);
};