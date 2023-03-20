const { ethers } = require("hardhat");
require("dotenv").config();
const { LINK_TOKEN, VRF_COORDINATOR, KEY_HASH, FEE } = require("../constants");

async function main() {
  /**
   * A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
   * so randomWinnerGame here is a factory for instances of our RandomWinnerGame contract
   */

  const randomWinnerGame = await ethers.getContractFactory("RandomWinnerGame");

  const deployedRandomWinnerGameContract = await randomWinnerGame.deploy(
    VRF_COORDINATOR,
    LINK_TOKEN,
    KEY_HASH,
    FEE
  );
  await deployedRandomWinnerGameContract.deployed();
  console.log(
    `RandomWinnerGame Contract address: ${deployedRandomWinnerGameContract.address}`
  );
  console.log(
    `Verify Contract address: ${deployedRandomWinnerGameContract.address}`
  );
  console.log("Sleeping....");
  sleep(30000);
  // Verify the deployed contract on Etherscan
  await hre.run("verify:verify", {
    address: deployedRandomWinnerGameContract.address,
    constructorArguments: [VRF_COORDINATOR, LINK_TOKEN, KEY_HASH, FEE],
  });
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Call the main function and catch any errors
main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
