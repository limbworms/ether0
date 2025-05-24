import Web3 from 'web3';
import NftSale from "./NftSale.json";

const web3 = new Web3(Web3.givenProvider || "ws://127.0.0.1:8545");

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contract = new web3.eth.Contract(NftSale.abi, contractAddress)

const sharedMessage = "The jpegs don't do anything."

export { web3, contract, contractAddress, sharedMessage };