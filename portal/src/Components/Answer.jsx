// import Tip from './Tip'
import EthName from './EthName'
import "./Answer.css"


export function Answer(props) {
  const number = props.number;
  const answer = props.answer;
  // const accounts = props.accounts;
  const isLoggedIn = props.isLoggedIn;
// const Answer = function ({ props, number, answer, accounts, isLoggedIn }) {
  const reply = {__html: answer.reply}

  return (

    <div className="content" id={props.id} style={{top: 0}}>
      <div id="popBoxTitle" className="headerTitle">
        <div className="topTitleLine"></div>
        <div className="titleLines"></div>
        <div className="titleLines"></div>
        <div className="titleLines"></div>
        <div className="titleLines"></div>
        <div className="bottomTitleLines"></div>
        <div id="popBoxTitleHandle" className="callTitle"> Reply #{number} </div>
        <div id="popBoxTitleCloseBox" className="control-box close-box" >
        <a id="popBoxTitleCloseInner" className="control-box-inner" onClick={() => {console.log(this)}}></a>
        </div>
      </div >
    <div className="answer">
      {/*<h3>Reply #{number}</h3>*/}
      <div className="main" dangerouslySetInnerHTML={reply}></div>
      <div className="meta">
        <EthName address={answer.account} />
        {/*<Tip isLoggedIn={isLoggedIn} accounts={accounts} address={answer.account} />*/}
      </div>
    </div>
    </div>
  )
}

export default Answer;