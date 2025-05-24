import { Web3 } from 'web3'
import MarkdownIt from 'markdown-it';

const markdown = new MarkdownIt()

// a list of 3 answers by default
// usually this would come from a database
// but to keep things simple, we're setting it here
const answers = [
  `That's fantastic work for a beginner! [Arteza](#) have great sculpting tools that you may want to check out!`,
  `From the looks of the clay, it could be a touch dry. 
  
  Maybe consider a _slight_ bit more water on your hands while you shape and you may find that a little easier.`,
  `I disagree with reply #3, I think the clay looks fine, no more water needed. `
].map(a => markdown.render(a))



async function resolver (responsePayload) {
  const payload = await responsePayload;
  return payload
}

function writeResponse(body, options){
    const myBlob = new Blob([body]);
    const res = new Response(myBlob, options);
    return res
}


// what happens when we ask for /api/answers
// export default function handler(req, res) {
export default function handler(req) {

  // const myBlob = new Blob();
  // const res = new Response(myBlob);

  // console.dir(req)
  // const _req = resolver(req.body.json())

  // if sent via a form, e.g. the reply form
  console.dir(req)
  // console.log("@@@@@@@@@@@@@@@")

  if (req.method === "POST") {
    const resolved = resolver(req)
    resolved.then(response => response.json())
    .then((data) => {

      console.log(data)

      const { signedMessage, confirmationMessage, account, reply="", questionId=1 } = data

      if (signedMessage !== null && confirmationMessage !== null && account !== null) {
        // get account from the confirmation message
        // and signed message
        const recoveredAccount = Web3.eth.accounts.recover(confirmationMessage, signedMessage)

        // check if account is same
        if (account.toLowerCase() === recoveredAccount.toLowerCase()) {  
            let newReply = markdown.render(reply)
            
            opt = { status: 200,
              account: account, 
              reply: newReply, 
              questionId: questionId, 
              answerId: 3 }

          const res = writeResponse(opt);
          return res

        } else {  
          // incorrect account
          // res
          //   .status(401)
          //   .json({ error: "incorrect account" })

          
          opt=  { status: 401,
              error: "incorrect account" 
            }
        console.log('111')
        const res = writeResponse(opt);
        return res

      }

      } else {
        // need to sign that message!
        // res
          // .status(401)
          // .json({ error: "need to sign message" })

          
            opt = { status: 401,
              error: "need to sign message" 
            }
        console.log('111')
        const res = writeResponse(opt);
        return res

      }});

  } else {

    // if fetched normally using fetch()
    const data = [
      { questionId: 1, answerId: 1, reply: answers[0], account: "0xDf7C7f491f26D35fCca74F6Fbd6b5FE437cc24C7" },
      { questionId: 1, answerId: 2, reply: answers[1], account: "0xb25bf3990c5a274a758a2a3a4cc90b3e407eaaf4" },
      { questionId: 1, answerId: 3, reply: answers[2], account: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65" }
    ]
  
    const body = JSON.stringify(data);
    // console.dir(JSON.stringify(data))
    // res
      // .setHeader('Content-Type', 'application/json')
      // .status(200)
      // .json({ answers: data })
        
      const opt = { 
          headers: new Headers({"Content-Type": "application/json",}),
          statusText: "OK",
          status: 200,
        }   

        // console.log(opt)
      const res = writeResponse(body, opt);
      // console.dir(res)   
      return res
  }

}
