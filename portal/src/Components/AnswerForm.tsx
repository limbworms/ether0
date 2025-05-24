import { useState } from "react"
import { Buffer } from "buffer";
import readin from "../assets/api/answers"
import { Web3 } from "../assets/api/web3";


function writeRequest(body, options){
    // console.dir(options)
    // const myBlob = new Blob([body]);
    // console.log('111')
    const req = new Request(body, options);
    // console.dir(req)
    return req
}


async function resolver (responsePayload) {
  const payload = await responsePayload;
  return payload
}



async function simulateFetch(data){
    setAnswers(current => {
      return [...current, data]
    })
    setMessage("")

}

const AnswerForm = function ({ accounts, setAnswers, isLoggedIn }) {
  const [message, setMessage] = useState("")

  const post = async function (event) {
    event.preventDefault()

    // const confirmationMessage = "This message is to verify that you are the person posting this reply!"
    // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    // var from = accounts[0];
    // var params = [from, JSON.stringify({message: confirmationMessage})];
    // var method = 'eth_signTypedData_v4';
    // const signature = await window.ethereum.request({ method, params });


    const exampleMessage = "Example personal_sign message."
    // try {
      const from = accounts[0]
      // For historical reasons, you must submit the message to sign in hex-encoded UTF-8.
      // This uses a Node.js-style buffer shim in the browser.
      const msg = `0x${Buffer.from(exampleMessage, "utf8").toString("hex")}`
      const sign = await ethereum.request({
        method: "personal_sign",
        params: [msg, from],
      })


      const data = { 
        questionId: 1,
        reply: message, 
        account: from,
        confirmationMessage: exampleMessage,
        signedMessage: sign,
      }

      const opt = { 
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data),
      }


      const request = writeRequest("", opt);
      const res = await readin(request);
      console.dir(res)

      // res.then(payload => payload.json())
      //    .then((_answers) =>{
      simulateFetch(_answers);
      // })

      // })


      // console.log('1')
      // console.dir(request)
      // const res = await readin(request);
      // console.log('2')
      // console.dir(res)


      // const _answers = await res.json();
      // console.log('3')
      // console.dir(res)

      // await simulateFetch(_answers);

      //     res.json().then(_answers =>{
      //       simulateFetch(_answers);
      //     })
      // })
      // const res = await readin(request);
      // const payload = await res.json();
      // const _answers = await resolver(payload);




      // personalSignResult.innerHTML = sign
      // personalSignVerify.disabled = false
    // } catch (err) {
      // console.error(err)
    // }





    // const signedMessage = await web3.eth.accounts.sign(confirmationMessage, accounts[0], "");
    // fetch("/api/answers", { 
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // })
    // .then(response => response.json())
    // .then(data => { })
    // .catch(error => {
    //  console.error(error)
    // })
  }

  return (

    <div className="content" id="AnswerForm">
      <div id="popBoxTitle" className="headerTitle">
        <div className="topTitleLine"></div>
        <div className="titleLines"></div>
        <div className="titleLines"></div>
        <div className="titleLines"></div>
        <div className="titleLines"></div>
        <div className="bottomTitleLines"></div>
        <div id="popBoxTitleHandle" className="callTitle"> Hello </div>
        <div id="popBoxTitleCloseBox" className="control-box close-box" >
        <a id="popBoxTitleCloseInner" className="control-box-inner" onClick={() => {console.log(this)}}></a>
        </div>
      </div >
      <form onSubmit={post} className="answer-form">
      <input 
        placeholder="Please be nice and courteous in your answers!" 
        value={message} 
        onChange={e => setMessage(e.target.value)}>  
      </input>
      
      <button disabled={!isLoggedIn}>Reply</button>
    </form>
    </div>
  )
}

export default AnswerForm