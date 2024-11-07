const { network, ethers } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const price = ethers.utils.parseEther("0.001");
  const baseUri = "ipfs:///";
  const supply = "50";

  log("----------------------------------------------------");
  const arguments = [price, baseUri, supply];
  const nft_no_wl = await deploy("Nft_sans_wl", {
    from: deployer,
    args: arguments,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });
};

module.exports.tags = ["all", "no_wl", "main"];
