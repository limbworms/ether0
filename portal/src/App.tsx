import { useState, useEffect } from 'react'
import { ethers, parseUnits } from "ethers";
import { BN } from "bn.js";
import { Web3 } from "web3";

import Account from './components/Account'
import EthName from './components/EthName'
import Answer from './components/Answer'
import AnswerForm from './components/AnswerForm'
// import { JazzSigil } from './components/JazzSigil'

import readin from "./assets/api/answers"

function App() {

  const [accounts, setAccounts] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [isLoading, setLoading] = useState(true)
  const [answers, setAnswers] = useState([])


  async function connectWallet (){
    let _account = await window.ethereum.request({ method: "eth_requestAccounts" });
    setAccounts(_account);
  }

  async function resolver (responsePayload) {
    const payload = await responsePayload;
    setLoading(false);
    return payload
  }

  function writeRequest(body, options){
    // const myBlob = new Blob([body]);
    const req = new Request("", options);
    return req
}


  useEffect(function(){
    setLoading(false);
  }, [isLoading])

  // useEffect(() => {
  //   console.log(answers)
  // }, [])


  useEffect(function(){
    async function fetchData() {

      if (accounts.length>0){
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

      window.ethereum.on('disconnect', function(_account) {
          setAccounts([])
          setIsLoggedIn(false)
        });
    }
    fetchData();
    // window.ethereum.off('disconnect', clearAccount);

  }, [accounts, isLoggedIn])




// Handle when we login to account
  useEffect(() => {

    //did we log in already
    async function fetchData() {
      let _account = await window.ethereum.request({ method: "eth_accounts" });
      setAccounts(_account);

      window.ethereum.on("accountsChanged", function (_account) {
        setAccounts(_account)
      });

      const opt = {      
        headers: { 'Content-Type': 'application/json' },
        method: "GET",}

      const request = writeRequest(JSON.stringify({}),opt)

      console.dir(request)
      
      const res = readin(request)
      const _answers = await resolver(res.json());
      setAnswers(_answers)
    };
    fetchData();

  }, [])


    var answersArea = (
      <div className="loadingAnswers"> LOADING... </div>
    )    

    if(!isLoading){
        answersArea = answers.slice(0).reverse().map((values, index) => {
          return <Answer key={answers.length-index} id={answers.length-index} number={answers.length-index} answer={values} isLoggedIn={isLoggedIn}/>
        })

    } else{
          <div className="loadingAnswers"> LOADED! </div>
    }

  return (
    <>
      <header style={{display: "flex", flexDirection: "row", flex: "0 0 40", padding: "4 8", alignItems: "center", justifyContent: "center", marginBottom: 50}}>
        <h1 style={{margin: "auto", marginTop: 12, }}>hi</h1>

        <Account  accounts={accounts} 
                  isLoggedIn={isLoggedIn} 
                  connect={connectWallet}>  </Account>
      </header>

      <section className="answers">
            <div  className="row-container" style={{display: "flex", flexDirection: "row",}}>
            <div  className="column-container" style={{display: "flex", flexDirection: "column", margin: "auto"}}>
            </div>
            <div  className="column-container" style={{display: "flex", flexDirection: "column", margin: "auto"}}>
            </div>
            <div  className="column-container" style={{display: "flex", flexDirection: "column", margin: "auto"}}>
              <AnswerForm accounts={accounts} setAnswers={setAnswers} isLoggedIn={isLoggedIn} />
              {answersArea}
            </div>

            </div>
      </section>

    </>
  )
}

export default App
