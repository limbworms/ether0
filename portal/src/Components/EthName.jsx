import { useState, useEffect } from "react"
import { Web3 } from 'web3';


import { getDefaultProvider } from 'ethers'

// import { useEnsName } from 'wagmi'
// import { useEnsAddress, useEnsName } from 'wagmi';
// import { mainnet } from 'wagmi/chains'

// import ENS, { getEnsAddress } from '@ensdomains/ensjs';
import { JazzSigil, BlockSigil } from './Sigils'

// const ens = useEnsName({address: '0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5',})
// const provider = getDefaultProvider() 
// async function fetchENS(address){
//   const names = await provider.lookupAddress("0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5");
//   console.dir(names)
// }
// fetchENS();



function EnsName(props) {
  // TODO!
  // get the address from outside
  // format it
  // check for ENS domain
  // get image if it has one
  // make jazzicon if not


  if(props.address!==null){
    let truncAddress = props.address.toString().slice(0,7) + "..." + props.address.toString().slice(-4)
    // console.dir(props.address)
    let icon = (
        <JazzSigil address={props.address.toString()}/>
        // <BlockSigil address={props.address.toString()}/>
      )






    return (
      <div className="eth-name" style={{display: "flex", flexDirection: "row", flex: "0 0 40", padding: "4 8"}}>
        <div className="icon">
          {icon}
        </div>

        <div className="name" style={{alignContent:"center"}}>
          <span className="primary" style={{marginTop:20, paddingLeft: 10}}>
            {truncAddress}
            {/* ENS name if one here */}
          </span>
          <span className="secondary">
            {/* formatted address here */}
          </span>
        </div>
       
      </div>
    )
  } else {
    return (<></>)
  }
}

export default EnsName