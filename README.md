
# NFT Whitelisting and Deployment

This project provides smart contracts for creating whitelisted and non-whitelisted NFTs, using EIP-712 signatures for whitelist verification. It includes deployment and testing scripts to streamline contract deployment and verification.

## Files and Structure

- **Smart Contracts:**
  - `EIP712Whitelisting.sol`: Manages whitelisting for NFTs using EIP-712 signature verification.
  - `NFT.sol`: An NFT contract with a whitelist feature.
  - `Nft_sans_wl.sol`: An NFT contract without whitelisting.

- **Deployment Script:**
  - `01--deploy--Nft_sans_wl.js`: Deploys the `Nft_sans_wl` contract, setting the price, base URI, and supply parameters.

- **Testing Scripts:**
  - `nft_nowl--test.js`: Contains tests for `Nft_sans_wl`'s constructor and minting functionalities.
  - `signWhitelist.js`: Provides a helper function to generate whitelist signatures.
  - `test-token.js`: Tests `NFT.sol`'s whitelist functionality with different cases for valid and invalid signature checks.

## Prerequisites

Ensure you have Node.js, Hardhat, and other required packages installed:

```bash
npm install hardhat @nomiclabs/hardhat-ethers ethers
```

## Usage

1. **Deploy the Contract**:

   Run the following command to deploy the `Nft_sans_wl` contract:

   ```bash
   npx hardhat run scripts/01--deploy--Nft_sans_wl.js --network <your-network>
   ```

2. **Run Tests**:

   To run tests for the whitelisted and non-whitelisted contracts:

   ```bash
   npx hardhat test
   ```

   The tests cover:
   - Contract initialization
   - Whitelisted and non-whitelisted minting scenarios
   - Valid and invalid signature handling

## Example Configuration

Example arguments for deployment (as seen in `01--deploy--Nft_sans_wl.js`):

```javascript
const price = ethers.utils.parseEther("0.001");
const baseUri = "ipfs:///";  // IPFS URI
const supply = "50";          // Total supply
```

---
