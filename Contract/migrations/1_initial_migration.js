// contract
const MilalPOC = artifacts.require("MilalPOC");

// makeAbi
const { makeAbi } = require("../utils/makeABI");

module.exports = async function (deployer) {
  await deployer.deploy(MilalPOC);
  const MilalPOCContract = await MilalPOC.deployed();

  makeAbi("MilalPOC", MilalPOCContract.address);
};
