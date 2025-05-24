import Head from 'next/head'
import Image from 'next/image'

import { useState, useEffect } from 'react'
import { web3, contract, sharedMessage } from '../lib/web3'

import Box from '../components/Box'
import BuyButton from '../components/BuyButton'

import Logo from '../public/logo.svg'
import Social from '../public/logo.svg'


export default function Home() {
  const [accounts, setAccounts] = useState([])
  const [canBuy, setCanBuy] = useState(false)
  const [totalSales, setTotalSales] = useState(0)
  const [hasAccess, setHasAccess] = useState(false)

  const connect = function () {
    window.ethereum
      .request({ method: "eth_requestAccounts"})
      .then(setAccounts);
  }

  const checkAccess = function () {
    if (accounts.length > 0) {

      // console.dir(accounts[0])
      // console.dir(contract.methods)
      // console.log(contract.methods.hasAccess().call().then(setHasAccess))
      contract.methods.hasAccess().call({ from: accounts[0] })
        .then(setHasAccess)
    } else {
      setHasAccess(false)
    }
  }

  const fetchCanBuy = async function () {

    contract.methods.canBuy().call()
      .then(setCanBuy);

    contract.methods.totalSales().call()
      .then(setTotalSales);
  }

  const buy = async function () {
    // TODO: transaction with contract
    // buy this from the contract by sending 0.01 ether
    // then once done, check access and update counts

    if (accounts.length > 0){
      try{
        const transaction = await contract.methods.buy().send({
          from: accounts[0],
          value: web3.utils.toWei("0.01", "ether"),
        })

        checkAccess()
        fetchCanBuy()

      } catch (e){
        alert(e)
      }

    contract.methods.totalSales().call()
      .then(setTotalSales);

    } else {
      alert("login, stupid");
    }
  }

  const download = async function () {
    if (accounts.length > 0) {

      console.log(sharedMessage,accounts[0])
      
      // const t = await web3.eth.personal.sign(sharedMessage, accounts[0])
      const msg = `0x${Buffer.from(sharedMessage, "utf8").toString("hex")}`
      const sign = await ethereum.request({
        method: "personal_sign",
        params: [msg, accounts[0]],
      })
      
      console.dir(sign)

      try {
        const r = await fetch("/api/download", {
          method: "POST",
          body: JSON.stringify({ "signature": sign })
        })
    
        const json = await r.json()

        window.location.href = json.url
      } catch (e) {
        alert("incorrect download url")
      }
    } else {
      alert("must be logged in")
    }
  }

  useEffect(() => {

    window.ethereum
      .request({ method: "eth_accounts" })
      .then(setAccounts)

    window.ethereum
      .on("accountsChanged", setAccounts)


  }, [])

  useEffect(() => {
    // check access if we change accounts
    checkAccess()
    fetchCanBuy()
  }, [accounts])

  return (
    <main>
      <div className="label">OA Records</div>
      <Box />
      <header className="App-header">
        <Image src={Logo} className="logo" />

        <h1>Get in Doofus</h1>
        <h2>{totalSales} / 100 sold</h2>

        <p>Look inside of yourself: mounds of rotten meat.</p>
        <p>You may as well rent out your organs while your money can still pay rent.</p>
      </header>

      <BuyButton accounts={accounts} connect={connect} buy={buy} canBuy={canBuy} hasAccess={hasAccess} download={download} />

      <Head>
        <title>Prism – the debut album, available in a limited edition</title>
      </Head>
    </main>
  )
}
