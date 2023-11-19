const main = async () => {
  const [owner, superCoder] = await hre.ethers.getSigners();
   const domainContract = await hre.ethers.deployContract('Domains');
   await domainContract.waitForDeployment();
   
   console.log("Contract Address:", domainContract.target);
   console.log("Contract owner:", owner.address);
 
   // Let's be extra generous with our payment (we're paying more than required)
   let txn = await domainContract.register("hello",  {value: hre.ethers.parseEther('0.001')});
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
   let contractBalance = await hre.ethers.provider.getBalance(domainContract.target);

   console.log("Balance of owner before withdrawal:", ethers.formatEther(ownerBalance));
   console.log("Contract balance before withdrawal:", ethers.formatEther(contractBalance));
 
   // Oops, looks like the owner is saving their money!
   txn = await domainContract.connect(owner).withdraw();
   await txn.wait();
   
   // Fetch balance of contract & owner
   ownerBalance = await hre.ethers.provider.getBalance(owner.address);
   contractBalance = await hre.ethers.provider.getBalance(domainContract.target);

   console.log("Balance of owner after withdrawal:", ethers.formatEther(ownerBalance));
   console.log("Contract balance after withdrawal:", ethers.formatEther(contractBalance));
 }
 
 main().catch((error) => {
   console.error(error);
   process.exitCode = 1;
 });