const main = async () => {
    const domainContract = await hre.ethers.deployContract('Domains');
    await domainContract.waitForDeployment();
  
    console.log("Contract deployed to:", domainContract.target);
  
    // CHANGE THIS DOMAIN TO SOMETHING ELSE! I don't want to see OpenSea full of bananas lol
    let txn = await domainContract.register("banana",  {value: hre.ethers.parseEther('0.1')});
    await txn.wait();
    console.log("Minted domain banana.ninja");
  
    txn = await domainContract.setRecord("banana", "Am I a banana or a ninja??");
    await txn.wait();
    console.log("Set record for banana.ninja");
  
    const address = await domainContract.getAddress("banana");
    console.log("Owner of domain banana:", address);
  
    const balance = await hre.ethers.provider.getBalance(domainContract.target);
    console.log("Contract balance:", ethers.formatEther(balance));
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });