import React, { useEffect } from 'react';
import useAsyncReference from './Components/useAsyncReference.js'
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Header from './Components/Header.js';
import Footer from './Components/Footer.js';
import SET_SURVEY_BODY from './Set_Survey_Page/Body.js';
import GET_SURVEYS_BODY from './Get_Surveys_Page/Body.js';
import ACCOUNT_BODY from './Account_Page/Body.js';
import ABOUT_US_BODY from './About_Us_Page/Body.js';

import Web3 from 'web3';
import surveyFunc from './contracts/FunctionalSurveys.json';
import token from './contracts/TokenSurveys.json';

const Body = styled.div`
  margin-bottom: 10em;
`;

const web3 = new Web3(Web3.givenProvider);

const tokenAddress = '0xA6DEe4BCdaFA3E5e66F2A8Fe1e4BEd9082B8bB40';
const tokenContract = new web3.eth.Contract(token.abi, tokenAddress);

const surveysAddress = '0x507Be3C79DAf1C7df43827F22A2114CeA60B0E6b';
const surveysContract = new web3.eth.Contract(surveyFunc.abi, surveysAddress);

function App() {

  const [storage, setStorage] = useAsyncReference({
    userAddress: undefined,
    loading: undefined,
    searchVal: '',
    titles: undefined,
    questions: undefined,
    answers: undefined,
    value: undefined,
    maxParticipants: undefined,
    showSurvey: false,
    selectedSurvey: undefined,
    balance: undefined,
    nrOfUserSurveys: undefined,
    surveyContractApproved: undefined,
    pollContractApproved: undefined
  });

  const resetState = () => setStorage({
    ...storage,
    searchVal: '',
    titles: undefined,
    questions: undefined,
    answers: undefined,
    value: undefined,
    maxParticipants: undefined,
    nrOfUserSurveys: undefined
  });

  const getUserAddress = async () => {
    setStorage({
      ...storage,
      loading: true
    });
    const accounts = await window.ethereum.enable();
    setStorage({
      ...storage,
      userAddress: accounts[0],
      loading: false
    });
  }
  useEffect(() => {
    if (storage.userAddress === undefined) {
      getUserAddress();
    }
  }, []);

  return (
    <Router>
      <Header
        storage={storage}
        setStorage={setStorage}
        tokenContract={tokenContract}
      />
      <Switch>
        <Body>
          <Route
            exact path="/"
            render={() =>
              <h1>this is home page</h1>
            }
          />

          <Route
            exact path="/startSurveys"
            render={(res) =>
              <SET_SURVEY_BODY
                storage={storage}
                setStorage={setStorage}
                resetState={resetState}
                surveysAddress={surveysAddress}
                surveysContract={surveysContract}
                tokenContract={tokenContract}
              />
            }
          />

          <Route
            exact path="/participateSurveys"
            render={() =>
              <GET_SURVEYS_BODY
                storage={storage}
                setStorage={setStorage}
                resetState={resetState}
                surveysContract={surveysContract}
              />
            }
          />

          <Route
            exact path="/aboutUs"
            render={() =>
              <ABOUT_US_BODY />
            }
          />

          <Route
            exact path="/accountSurveys"
            render={() =>
              <ACCOUNT_BODY
                storage={storage}
                setStorage={setStorage}
                resetState={resetState}
                surveysContract={surveysContract}
              />
            }
          />
        </Body>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
