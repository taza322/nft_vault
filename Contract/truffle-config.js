require("dotenv").config();
const CryptoJS = require("crypto-js");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const { ADDRESS, PRIVATE_KEY, RPC_URL } = process.env;
const privateKey = CryptoJS.AES.decrypt(PRIVATE_KEY, ADDRESS).toString(
  CryptoJS.enc.Utf8
);

module.exports = {
  networks: {
    ganache: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    klaytnTest: {
      provider: () => new HDWalletProvider(privateKey, RPC_URL),
      network_id: 1001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    klaytn: {
      provider: () => new HDWalletProvider(privateKey, RPC_URL),
      network_id: 8217,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },

  mocha: {},

  contracts_build_directory: "./datas/low",

  compilers: {
    solc: {
      version: "pragma",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
};
