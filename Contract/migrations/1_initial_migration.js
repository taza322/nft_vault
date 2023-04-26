// contract
// const MilalPOC = artifacts.require("MilalPOC");
const Milal = artifacts.require("Milal");

// makeAbi
const { makeAbi } = require("../utils/makeABI");

module.exports = async function (deployer) {
  await deployer.deploy(Milal);
  const MilalContract = await Milal.deployed();

  makeAbi("Milal", MilalContract.address);
};
