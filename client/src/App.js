import React, { useEffect } from 'react';
import useAsyncReference from './Components/useAsyncReference.js'
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Connect from './Components/Connect.js';
import Header from './Components/Header/Header.js';
import Footer from './Components/Footer.js';
import DAPP from './DAPP_Page/App_Page/Body.js';
import SET_SURVEY_BODY from './DAPP_Page/Set_Survey_Page/Body.js';
import GET_SURVEYS_BODY from './DAPP_Page/Get_Surveys_Page/Body.js';
import SET_POLL_BODY from './DAPP_Page/Set_Poll_Page/Body.js';
import GET_POLLS_BODY from './DAPP_Page/Get_Poll_Page/Body.js';
import ACCOUNT_SURVEYS_BODY from './Account_Page/Account_Surveys/Body.js';
import ACCOUNT_POLLS_BODY from './Account_Page/Account_Polls/Body.js';
import HOME_BODY from './Home_Page/Body.js';

import Web3 from 'web3';
import surveyFunc from './contracts/FunctionalSurveys.json';
import pollFunc from './contracts/PollFunc.json';
import token from './contracts/TokenSurveys.json';

const web3 = new Web3(Web3.givenProvider);

const tokenAddress = '0x040D748872d79b1c52BBbc66A7E67461BFF246Bc';
const tokenContract = new web3.eth.Contract(token.abi, tokenAddress);

const surveysAddress = '0x9aF2a5B477DF380830E9153BE3c6ef6DD505a848';
const surveysContract = new web3.eth.Contract(surveyFunc.abi, surveysAddress);

const pollAddress = '0xFD8c27C0303E39fd3867ad9AC3BF80F69aB630B9';
const pollContract = new web3.eth.Contract(pollFunc.abi, pollAddress);

const Body = styled.div`
  height: 100%;
  margin: ${props => props.showResizedNav ? '16em' : '5em'} 0 5em 0;
`;

function App() {

  const [storage, setStorage] = useAsyncReference({
    surveyContractApproved: undefined,
    pollContractApproved: undefined,
    userAddress: undefined,
    balance: undefined,
    connected: true,
    loading: false,
    showResizedNav: false,
    searchVal: '',

    surveyTitle: undefined,
    allSurevyTitles: undefined,
    userSurveyTitles: undefined,

    pollTitle: undefined,
    allPollTitles: undefined,
    userPollTitles: undefined,

    questions: undefined,
    choices: undefined,

    answers: undefined,
    choice: undefined,
    votes: undefined,

    value: undefined,
    maxParticipants: undefined,

    showSurvey: false,
    showPoll: false,

    selectedSurvey: undefined,
    selectedPoll: undefined,

    nrOfUserSurveys: undefined,
    nrOfUserPolls: undefined,

    windowWidth: window.innerWidth
  });

  let resizeWindow = () => {
    setStorage({ ...storage, windowWidth: window.innerWidth, showResizedNav: false });
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  return (
    <Router>
      <Switch>
        <Body showResizedNav={storage.showResizedNav}>

          <Route exact path="/">
            <HOME_BODY />
          </Route>

          <Route exact path="/App">
            <DAPP
              storage={storage}
              setStorage={setStorage}
              surveysAddress={surveysAddress}
              surveysContract={surveysContract}
              pollAddress={pollAddress}
              pollContract={pollContract}
              tokenContract={tokenContract}
            />
          </Route>

          <Route exact path="/App/Set_Survey">
            <SET_SURVEY_BODY
              storage={storage}
              setStorage={setStorage}
              tokenContract={tokenContract}
              surveysAddress={surveysAddress}
              surveysContract={surveysContract}
            />
          </Route>

          <Route exact path="/App/Get_Surveys">
            <GET_SURVEYS_BODY
              storage={storage}
              setStorage={setStorage}
              surveysContract={surveysContract}
            />
          </Route>

          <Route exact path="/App/Set_Poll">
            <SET_POLL_BODY
              storage={storage}
              setStorage={setStorage}
              tokenContract={tokenContract}
              pollAddress={pollAddress}
              pollContract={pollContract}
            />
          </Route>

          <Route exact path="/App/Get_Polls">
            <GET_POLLS_BODY
              storage={storage}
              setStorage={setStorage}
              pollContract={pollContract}
            />
          </Route>

          <Route exact path="/accountSurveys">
            <ACCOUNT_SURVEYS_BODY
              storage={storage}
              setStorage={setStorage}
              surveysContract={surveysContract}
            />
          </Route>

          <Route exact path="/accountPolls">
            <ACCOUNT_POLLS_BODY
              storage={storage}
              setStorage={setStorage}
              pollContract={pollContract}
            />
          </Route>
        </Body>
      </Switch>
      <Header
        storage={storage}
        setStorage={setStorage}
        tokenContract={tokenContract}
      />
      <Footer />
      <Connect
        storage={storage}
        setStorage={setStorage}
      />
    </Router >
  );
}

export default App;
