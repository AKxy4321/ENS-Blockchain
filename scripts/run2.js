const hre = require('hardhat')

const main = async () => {
  const domainContract = await hre.ethers.deployContract("Domains2");
  await domainContract.waitForDeployment();
  console.log("Contract deployed to:", domainContract.target);    // .deployContract()
};                                                                // .waitForDeployment()
                                                                  // .address = .target
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

