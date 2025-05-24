import { web3, contract, sharedMessage } from '../../lib/web3';

const notOk = (res) => {
  res.status(403).json({ url: null })
}

const ok = (res) => {
  res.status(200).json({ url: "https://www.calgaryzoo.com/wp-content/uploads/2024/09/DSC01798-1.jpg" })
}

export default async function handler(req, res) {
  // TODO: make sure the download is only
  // accessible to people who own it
  try{
    const body = JSON.parse(req.body);
    if(!body.signature){
      notOk(res)
    }


    // const hexString = "0x68656c6c6f20776f726c64"; // example encoded string
    // const originalMessage = Buffer.from(hexString.slice(2), "hex").toString("utf8");
    const msg = `0x${Buffer.from(sharedMessage, "utf8").toString("hex")}`
    const account = web3.eth.accounts.recover(msg, body.signature);
    console.dir(account)
    contract.methods.hasAccess().call({from: account})
      .then(function(data){
        if (data){
          ok(res)
        } else{
          notOk(res)
        }
      })

    // ok(res)
  } catch (e){
    notOk(res)
  }
}
