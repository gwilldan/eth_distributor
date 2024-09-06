const { Wallet, JsonRpcProvider, ContractFactory } = require("ethers");
require("dotenv").config();
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const { BERACHAIN_RPC, SEPOLIA_RPC } = require("../constants");
const provider = new JsonRpcProvider(BERACHAIN_RPC);
const wallet = new Wallet(PRIVATE_KEY, provider);
const {
	abi,
	bytecode,
} = require("../artifacts/contracts/ETHDistributor.sol/ETHDistributor.json");

const deploy = async () => {
	const factory = new ContractFactory(abi, bytecode, wallet);
	const contract = await factory.deploy();
	await contract.waitForDeployment();

	console.log("contract deployed to ...", await contract.getAddress());
};

deploy();
