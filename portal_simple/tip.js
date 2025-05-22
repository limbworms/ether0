import { ethers, parseUnits } from "ethers";
import { BN } from "bn.js";
import { Web3 } from "web3";

const web3 = new Web3(Web3.givenProvider);



async function send(amount){
    form.style.backgroundColor = "blue";
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

    // console.dir(amount)
    const wei =  web3.utils.toWei(amount, "ether");
    // var bnWei = new BN(wei, 16);
    // console.dir(wei)
    // console.dir(web3.utils.toHex(wei))


    if(accounts.length>0){
      window.ethereum.request({ 
        method: "eth_sendTransaction",
        params: [{
          from: accounts[0], 
          to: "0x0CB995a807d51e5A17382212E22c3B1dfED2aCA4",
          value: web3.utils.numberToHex(wei),
                  }] });
    alert("Success! Connected @ " + accounts)      
    }
}







// const connectWallet = async (wallet) => {
//     try {
//       await wallet.provider.request({ method: "eth_requestAccounts" })
//     } catch (error) {
//     console.error("Failed to connect to provider:", error)
//     }
// }

const form = document.querySelector("form")

if (window.ethereum){
  form.classList.add("has-eth")
}

form.addEventListener("submit", function(event){
  event.preventDefault()

  if (window.ethereum){
    const inVal = form.querySelector("input");

    send(inVal.value);
    // connectWithProvider(event.detail)

  } else{
    alert("Please install wallet")
  }
})