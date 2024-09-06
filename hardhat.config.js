// require("@nomicfoundation/hardhat-verify");
require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const { BERACHAIN_RPC, SEPOLIA_RPC } = require("./constants");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: {
		version: "0.8.24",
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
	defaultNetwork: "bartio_testnet",
	networks: {
		sepolia: {
			accounts: [PRIVATE_KEY],
			url: SEPOLIA_RPC,
		},
		bartio_testnet: {
			accounts: [PRIVATE_KEY],
			url: BERACHAIN_RPC,
		},
	},
	etherscan: {
		apiKey: {
			bartio_testnet: "bartio_testnet", // apiKey is not required, just set a placeholder
		},
		customChains: [
			{
				network: "bartio_testnet",
				chainId: 80084,
				urls: {
					apiURL:
						"https://api.routescan.io/v2/network/testnet/evm/80084/etherscan",
					browserURL: "https://bartio.beratrail.io",
				},
			},
		],
	},
};
