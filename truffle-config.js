require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3ProviderEngine = require('@trufflesuite/web3-provider-engine');
const RpcSubprovider = require('@trufflesuite/web3-provider-engine/subproviders/rpc');
const ProviderSubprovider = require('@trufflesuite/web3-provider-engine/subproviders/provider');

const privateKey = process.env.PRIVATE_KEY;
const infuraUrl = `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;

const hdWalletProvider = new HDWalletProvider({
  privateKeys: [privateKey],
  providerOrUrl: infuraUrl,
  numberOfAddresses: 1,
  shareNonce: true,
});

const engine = new Web3ProviderEngine();
engine.addProvider(new ProviderSubprovider(hdWalletProvider));
engine.addProvider(new RpcSubprovider({ rpcUrl: infuraUrl }));
engine.start();

module.exports = {
  networks: {
    mainnet: {
      provider: () => engine,
      network_id: 1,       // Mainnet ID
      gas: 6721975,        // Gas limit
      gasPrice: 2000000000 // 20 Gwei
    }
  },
  compilers: {
    solc: {
      version: "^0.8.26",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};
