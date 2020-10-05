import React, { useState, useEffect } from 'react';
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
  margin-bottom: 5em;
`;

const web3 = new Web3(Web3.givenProvider);

const tokenAddress = '0xA6DEe4BCdaFA3E5e66F2A8Fe1e4BEd9082B8bB40';
const tokenContract = new web3.eth.Contract(token.abi, tokenAddress);

const surveysAddress = '0x507Be3C79DAf1C7df43827F22A2114CeA60B0E6b';
const surveysContract = new web3.eth.Contract(surveyFunc.abi, surveysAddress);

function App() {
  const [userAddress, setUserAddress] = useState(undefined);

  const [loading, setLoading] = useState(false);
	const [searchVal, setSearchVal] = useState('');

  const [title, setTitle] = useState(undefined);
  const [questions, setQuestions] = useState(undefined);
  const [value, setValue] = useState(undefined);
  const [maxParticipants, setMaxParticipants] = useState(undefined);

  const [surveyTitles, setSurveyTitles] = useState(undefined);
  const [surveyQuestions, setSurveyQuestions] = useState(undefined);
  const [surveyAnswers, setSurveyAnswers] = useState(undefined);

  const [showSurvey, setShowSurvey] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(undefined);

  const [balance, setBalance] = useState(undefined);
  const [nrOfUserSurveys, setNrOfUserSurveys] = useState(undefined);

  const [surveyContractApproved, setSurveyContractApproved] = useState(true);
  const [pollContractApproved, setPollContractApproved] = useState(true);

  const getUserAddress = async () => {
    const accounts = await window.ethereum.enable();
    setUserAddress(accounts[0]);
  }
  useEffect(() => {
    if (userAddress === undefined) {
      getUserAddress();
    }
  });

  return (
    <Router>
      <Header
        balance={balance}
        setBalance={setBalance}

        loading={loading}
        setLoading={setLoading}

        surveyTitles={surveyTitles}
        setSearchVal={setSearchVal}

        tokenContract={tokenContract}
        userAddress={userAddress}
      />
      <Switch>
        <Body>
          <Route exact path="/">
            <h1>this is home page</h1>
          </Route>

          <Route path="/startSurveys">
            <SET_SURVEY_BODY
              title={title}
              setTitle={setTitle}

              questions={questions}
              setQuestions={setQuestions}

              value={value}
              setValue={setValue}

              maxParticipants={maxParticipants}
              setMaxParticipants={setMaxParticipants}

              loading={loading}
              setLoading={setLoading}

              surveysAddress={surveysAddress}
              surveysContract={surveysContract}
              tokenContract={tokenContract}
              userAddress={userAddress}
            />
          </Route>

          <Route path="/participateSurveys">
            <GET_SURVEYS_BODY
              surveyTitles={surveyTitles}
              setSurveyTitles={setSurveyTitles}

              surveyQuestions={surveyQuestions}
              setSurveyQuestions={setSurveyQuestions}

              surveyAnswers={surveyAnswers}
              setSurveyAnswers={setSurveyAnswers}

              showSurvey={showSurvey}
              setShowSurvey={setShowSurvey}

              selectedSurvey={selectedSurvey}
              setSelectedSurvey={setSelectedSurvey}

              loading={loading}
              setLoading={setLoading}

              searchVal={searchVal}

              surveysContract={surveysContract}
              userAddress={userAddress}
            />
          </Route>

          <Route path="/aboutUs">
            <ABOUT_US_BODY />
          </Route>

          <Route path="/accountSurveys">
            <ACCOUNT_BODY
              balance={balance}
              setBalance={setBalance}

              nrOfUserSurveys={nrOfUserSurveys}
              setNrOfUserSurveys={setNrOfUserSurveys}

              surveyTitles={surveyTitles}
              setSurveyTitles={setSurveyTitles}

              surveyQuestions={surveyQuestions}
              setSurveyQuestions={setSurveyQuestions}

              surveyAnswers={surveyAnswers}
              setSurveyAnswers={setSurveyAnswers}

              showSurvey={showSurvey}
              setShowSurvey={setShowSurvey}

              selectedSurvey={selectedSurvey}
              setSelectedSurvey={setSelectedSurvey}

              loading={loading}
              setLoading={setLoading}

              searchVal={searchVal}

              surveysContract={surveysContract}
              userAddress={userAddress}
            />
          </Route>
        </Body>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
