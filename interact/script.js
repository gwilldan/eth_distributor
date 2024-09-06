const {
	Wallet,
	JsonRpcProvider,
	formatEther,
	parseEther,
	Contract,
} = require("ethers");
require("dotenv").config();
const {
	BERACHAIN_RPC,
	SEPOLIA_RPC,
	CONTRACT_ADDRESS,
} = require("../constants");
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const provider = new JsonRpcProvider(BERACHAIN_RPC);
const wallet = new Wallet(PRIVATE_KEY, provider);
const {
	abi,
} = require("../artifacts/contracts/ETHDistributor.sol/ETHDistributor.json");
const contract = new Contract(CONTRACT_ADDRESS, abi, wallet);

const walletList = [
	"0xcC84032Cb57340044Ce5e0F29019F75C32c632b9",
	"0xcC84032Cb57340044Ce5e0F29019F75C32c632b9",
	"0xcC84032Cb57340044Ce5e0F29019F75C32c632b9",
];
const amountList = ["0.01", "0.02", "0.03"];

const interact = async () => {
	console.log("starting!!!!....");
	const B_amountList = amountList.map((amount) => parseEther(amount));

	const res = await contract.getTotalRequiredETH(walletList, B_amountList);
	const bal = await provider.getBalance(wallet.address);
	if (bal < res)
		return console.error(
			`Insufficient Wallet balance... you need more than ${formatEther(
				res
			)} Native token `
		);

	const tx = await contract.distribute(walletList, B_amountList, {
		value: res,
	});
	tx.wait();

	console.log("Native tokens successfully sen!!!!");
	console.log(tx);
};

interact();
