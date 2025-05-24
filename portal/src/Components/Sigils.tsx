// import { Jazzicon } from '@ukstv/jazzicon-react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { blo, bloSvg } from "blo";

// import styled from '@emotion/styled';

// const ModifiedJazzicon = styled(Jazzicon)({
//   width: 32,
//   height: 32,
// });

export function JazzSigil(props) {
  // console.dir(address.address)
  // console.log(jsNumberForAddress(props.address))
  return (

    <Jazzicon diameter={18} seed={jsNumberForAddress(props.address)} />
      );
}

export function BlockSigil(props) {

  // doesn't work >:^(
  return (
    <img src={bloSvg(props.address, 18)}/>
      );


}