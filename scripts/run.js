const hre = require('hardhat');

const main = async () => {
  const domainContract = await hre.ethers.deployContract('Domains');
  await domainContract.waitForDeployment();

  console.log("Contract deployed to:", domainContract.target);

  let txn = await domainContract.register("mortal",  {value: hre.ethers.parseEther('0.1')});
  await txn.wait();
  
  const address = await domainContract.getAddress("mortal");
  console.log("Owner of domain mortal:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.target);
  console.log("Contract balance:", ethers.formatEther(balance));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});