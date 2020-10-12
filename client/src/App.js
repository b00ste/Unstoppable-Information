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
import ACCOUNT_SURVEYS_BODY from './Account_Page/Account_Surveys/Body.js';
import ABOUT_US_BODY from './About_Us_Page/Body.js';

import Web3 from 'web3';
import surveyFunc from './contracts/FunctionalSurveys.json';
import token from './contracts/TokenSurveys.json';

const web3 = new Web3(Web3.givenProvider);

const tokenAddress = '0xA6DEe4BCdaFA3E5e66F2A8Fe1e4BEd9082B8bB40';
const tokenContract = new web3.eth.Contract(token.abi, tokenAddress);

const surveysAddress = '0x507Be3C79DAf1C7df43827F22A2114CeA60B0E6b';
const surveysContract = new web3.eth.Contract(surveyFunc.abi, surveysAddress);

const pollAddress = '0x507Be3C79DAf1C7df43827F22A2114CeA60B0E6b';
const pollContract = new web3.eth.Contract(surveyFunc.abi, surveysAddress);

const Body = styled.div`
  height: 100%;
  margin: ${props => props.showResizedNav ? '16em' : '6em' } 0 5em 0;
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
    answers: undefined,
    value: undefined,
    maxParticipants: undefined,
    showSurvey: false,
    selectedSurvey: undefined,
    nrOfUserSurveys: undefined,
    windowWidth: 0
  });

	let resizeWindow = () => {
		setStorage({ ...storage, windowWidth: window.innerWidth });
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

          <Route exact path="/">
            <ABOUT_US_BODY />
          </Route>

          <Route exact path="/accountSurveys">
            <ACCOUNT_SURVEYS_BODY
              storage={storage}
              setStorage={setStorage}
              surveysContract={surveysContract}
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
