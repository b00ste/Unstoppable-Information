import React, { useState, useEffect } from 'react';
import 'bootswatch/dist/lux/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Header from './Components/Header.js';
import Footer from './Components/Footer.js';
import SET_SURVEY_BODY from './Components/Set_Survey_Page/Body.js';
import GET_SURVEYS_BODY from './Components/Get_Surveys_Page/Body.js';
import ACCOUNT_BODY from './Components/Account_Page/Body.js';

import Web3 from 'web3';
import func from './contracts/FunctionalSurveys.json';
//import proxy from './contracts/ProxySurveys.json';

const web3 = new Web3(Web3.givenProvider);
const contractAddress = '0x03b90E47542bD96d19E974BeA9e81fA0e5708DDf';
const surveysContract = new web3.eth.Contract(func.abi, contractAddress);

function App() {
  const [userAddress, setUserAddress] = useState(undefined);

  const [loading, setLoading] = useState(false);

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
  const [userSurveys, setUserSurveys] = useState(undefined);

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

        surveysContract={surveysContract}
        userAddress={userAddress}
      />
      <Switch>

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

            surveysContract={surveysContract}
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

            surveysContract={surveysContract}
            userAddress={userAddress}
          />
        </Route>

        <Route path="/aboutUs">
          <h1>this is about page</h1>
          <p>
            This is a paragraph about us
          </p>
        </Route>

        <Route path="/account">
          <ACCOUNT_BODY
            balance={balance}
            setBalance={setBalance}

            nrOfUserSurveys={nrOfUserSurveys}
            setNrOfUserSurveys={setNrOfUserSurveys}

            userSurveys={userSurveys}
            setUserSurveys={setUserSurveys}

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

            surveysContract={surveysContract}
            userAddress={userAddress}
          />
        </Route>

      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
