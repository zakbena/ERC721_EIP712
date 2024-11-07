require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");
// require { HardhatUserConfig } from "hardhat/config";
// require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
// require("solidity-coverage");
// require("hardhat-gas-reporter");
// require("hardhat-contract-sizer");
require("dotenv").config();

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const GOERLI_URL = process.env.RPC_URL;
const PRIVATE_KEY1 = process.env.PRIVATE_KEY;
const ETHERSCAN_API = process.env.ETHERSCAN_API_KEY;
const CMC_API = process.env.CMC;

module.exports = {
  solidity: {
    compilers: [{ version: "0.8.7" }, { version: "0.8.4" }],
  },

  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: GOERLI_URL,
      accounts: PRIVATE_KEY1,
      chainId: 5,
      // BlockConfirmations: 18,
    },
    local: {
      url: "http://127.0.0.1:8545/",
      accounts: [`${PRIVATE_KEY1}`],
      chainId: 31337,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
      // 5: 0,
    },
  },
};

// export default config;
