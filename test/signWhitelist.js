const { SignerWithAddress } = require("@nomiclabs/hardhat-ethers/signers");

module.exports = async function signWhitelist(
  chainId,
  contractAddress,
  whitelistKey = SignerWithAddress,
  mintingAddress
) {
  // Domain data should match whats specified in the DOMAIN_SEPARATOR constructed in the contract
  // https://github.com/msfeldstein/EIP712-whitelisting/blob/main/contracts/EIP712Whitelisting.sol#L33-L43
  const domain = {
    name: "WhitelistToken",
    version: "1",
    chainId,
    verifyingContract: contractAddress,
  };

  // The types should match the TYPEHASH specified in the contract
  // https://github.com/msfeldstein/EIP712-whitelisting/blob/main/contracts/EIP712Whitelisting.sol#L27-L28
  const types = {
    Minter: [{ name: "wallet", type: "address" }],
  };

  const sig = await whitelistKey._signTypedData(domain, types, {
    wallet: mintingAddress,
  });

  return sig;
};
