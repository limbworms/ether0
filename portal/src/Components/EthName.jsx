import { useState, useEffect } from "react"
import { Web3 } from 'web3';

import { JazzSigil, BlockSigil } from './Sigils'


// seed={jsNumberForAddress('0x1111111111111111111111111111111111111111')} />
function EnsName(props) {
  // TODO!
  // get the address from outside
  // format it
  // check for ENS domain
  // get image if it has one
  // make jazzicon if not


  if(props.address!==null){
    let truncAddress = props.address.toString().slice(0,7) + "..." + props.address.toString().slice(-4)
    console.dir(props.address)
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