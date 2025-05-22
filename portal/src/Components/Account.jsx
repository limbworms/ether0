import EthName from './EthName'
// import {CurrencyEth} from "@phosphor-icons/react";
import { NetworkEthereum } from '@web3icons/react'


const Account = function ({ accounts, isLoggedIn, connect }) {
  // TODO!!!
  // if already logged in, it should show 
  // the EthName component with the correct address
  // if not logged in, show a connect button
  // that when its clicked, will prompt us to login
  // and store the info on the page


// import { NetworkIcon } from '@web3icons/react'
        // <NetworkBase variant="mono" size="64" color="#019469" />

          // <NetworkBase variant="mono" size="64" color="#019469" />

          // <NetworkBase variant="mono" size="64" color="#019469" />

          // <NetworkIcon network="base" variant="mono" size="64" color="#019469"/>

  console.log(isLoggedIn)

  if(accounts[0]){
    // if(accounts.length>0){let truncAddress = accounts[0].slice(0,4) + "..." + accounts[0].slice(-4)}
    return(
      <div className="row-container"
            style={{margin: "auto",display: "flex", flexDirection: "row", alignItems: "center",  gap: 5}}>
        <div className="sigil" >
          <button >
            <NetworkEthereum variant="mono" size="18" color="#FFFFFF"/>
          </button>
        </div>   

        <button>
          <EthName address={accounts[0]}/>
        </button>
      </div>
      )    
  }
  else {
    return (

      <div className="row-container"
            style={{margin: "auto",display: "flex", flexDirection: "row", alignItems: "center",  gap: 5}}>
        <div className="sigil" >
          <button >
            <NetworkEthereum variant="mono" size="18" color="#FFFFFF"/>
          </button>
        </div>   

        <button style={{height: 34}} onClick={connect}>Connect</button>
      </div>
    )
  }
}

export default Account;