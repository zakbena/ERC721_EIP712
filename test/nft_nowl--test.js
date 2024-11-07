const { assert, expect } = require("chai");
const {
  developmentChains,
  networkConfig,
} = require("../helper-hardhat-config");
const { SignerWithAddress } = require("@nomiclabs/hardhat-ethers/signers");
const signWhitelist = require("./signWhitelist");
const { network, deployments, ethers, getNamedAccounts } = require("hardhat");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe.only("Nft_sans_wl", function () {
      let BasicNFT_contract, deployer, counter, c_price, c_supply, c_uri;
      let chainId = network.config.chainId;
      let mintingKey = SignerWithAddress;
      let whitelistKey = SignerWithAddress;
      let maliciousKey = SignerWithAddress;

      const price = ethers.utils.parseEther("0.001");
      const baseUri = "ipfs://QmR7M6cDNYyz8vnRdGd5nrjEknH9UuSmeEt6mBqXVu8Zer/";
      const supply = "50";

      beforeEach(async function () {
        const accounts = await ethers.getSigners();
        mintingKey = accounts[0];
        whitelistKey = accounts[1];
        maliciousKey = accounts[2];
        deployer = (await getNamedAccounts).deployer;
        await deployments.fixture(["no_wl"]);
        nft_no_wl = await ethers.getContract("Nft_sans_wl", deployer);
        counter = await nft_no_wl.getCounter();
        c_price = await nft_no_wl.getPrice();
        c_supply = await nft_no_wl.getSupply();
        c_uri = await nft_no_wl.getURI();
      });

      describe("constructor", function () {
        it("Initialize the constructor", async function () {
          const name = await nft_no_wl.name();
          const symbol = await nft_no_wl.symbol();
          assert.equal(c_price.toString(), price);
          assert.equal(c_uri.toString(), baseUri);
          assert.equal(c_supply.toString(), supply);
          assert.equal(name.toString(), "Sample");
          assert.equal(symbol.toString(), "SMP");
        });
      });

      describe("mint", function () {
        it("Should allow minting with whitelist enabled if a valid signature is sent", async function () {
          await nft_no_wl.setWhitelistSigningAddress(whitelistKey.address);
          let { chainId } = await ethers.provider.getNetwork();
          const sig = signWhitelist(
            chainId,
            nft_no_wl.address,
            whitelistKey,
            mintingKey.address
          );
          await nft_no_wl.mint(1, sig, { value: price });
        });
      });
    });
