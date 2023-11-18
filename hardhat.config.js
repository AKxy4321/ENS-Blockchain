require("@nomicfoundation/hardhat-toolbox");
require('@nomicfoundation/hardhat-chai-matchers');
require('@nomicfoundation/hardhat-ethers');
require('ethers');

module.exports = {
  solidity: "0.8.20",
  networks: {
    mumbai: {
      url: "https://thrilling-frosty-river.matic-testnet.quiknode.pro/380256b0d5c75205cffdf9a18f1a61ccfd582b30/",
      accounts: ["f85cfa4f0f6b1a6d80690bea6327a15eca03c5149d19f50c37d616d7bc3f3c81"],
    }
  }
};
