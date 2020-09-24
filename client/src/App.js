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
const contractAddress = '0x141a196928354DF72898719775A0bB5945c8F8d0';
const surveysContract = new web3.eth.Contract(func.abi, contractAddress);

function App() {
  const [account, setAccount] = useState(undefined);

  const [title, setTitle] = useState(undefined);
  const [questions, setQuestions] = useState([]);
  const [value, setValue] = useState(undefined);
  const [maxParticipants, setMaxParticipants] = useState(undefined);

  const [surveyTitles, setSurveyTitles] = useState([]);
  const [surveyQuestions, setSurveyQuestions] = useState({});
  const [showSurvey, setShowSurvey] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(undefined);

  const getAccount = async () => {
		const accounts = await window.ethereum.enable();
    setAccount(accounts[0]);
	}
	useEffect(() => {
		if(account === undefined){
      getAccount();
		}
	});

  return (
    <Router>
      <Header account={account} />
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

            surveysContract={surveysContract}
            account={account}
          />
        </Route>

        <Route path="/participateSurveys">
          <GET_SURVEYS_BODY
            surveyTitles={surveyTitles}
            setSurveyTitles={setSurveyTitles}

            surveyQuestions={surveyQuestions}
            setSurveyQuestions={setSurveyQuestions}

            showSurvey={showSurvey}
            setShowSurvey={setShowSurvey}

            selectedSurvey={selectedSurvey}
            setSelectedSurvey={setSelectedSurvey}

            surveysContract={surveysContract}
            account={account}
          />
        </Route>

        <Route path="/aboutUs">
          <h1>this is about page</h1>
          <p>
            This is a paragraph about us
          </p>
        </Route>

        <Route path="/account">
          <h1>this is account page</h1>
          <ACCOUNT_BODY

            surveysContract={surveysContract}
            account={account}
          />
        </Route>

      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
