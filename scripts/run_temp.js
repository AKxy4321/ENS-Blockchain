const main = async () => {
   const [owner, superCoder] = await hre.ethers.getSigners();
    const domainContract = await hre.ethers.deployContract('Domains');
    await domainContract.waitForDeployment();
  
    console.log("Contract owner:", owner.address);
  
    // Let's be extra generous with our payment (we're paying more than required)
    let txn = await domainContract.register("a16z",  {value: hre.ethers.parseEther('1000')});
    await txn.wait();
  
    // How much money is in here?
    const balance = await hre.ethers.provider.getBalance(domainContract.target);
    console.log("Contract balance:", ethers.formatEther(balance));
  
    // Quick! Grab the funds from the contract! (as superCoder)
    try {
      txn = await domainContract.connect(superCoder).withdraw();
      await txn.wait();
    } catch(error){
      console.log("Could not rob contract");
    }
  
    // Let's look in their wallet so we can compare later
    let ownerBalance = await hre.ethers.provider.getBalance(owner.address);
    console.log("Balance of owner before withdrawal:", ethers.formatEther(ownerBalance));
  
    // Oops, looks like the owner is saving their money!
    txn = await domainContract.connect(owner).withdraw();
    await txn.wait();
    
    // Fetch balance of contract & owner
    const contractBalance = await hre.ethers.provider.getBalance(domainContract.target);
    ownerBalance = await hre.ethers.provider.getBalance(owner.address);
  
    console.log("Contract balance after withdrawal:", ethers.formatEther(contractBalance));
    console.log("Balance of owner after withdrawal:", ethers.formatEther(ownerBalance));
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });