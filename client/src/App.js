import React, { useState } from 'react';
import 'bootswatch/dist/lux/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Header from './Components/Header.js';
import Footer from './Components/Footer.js';
import Set_Survey_Body from './Components/Set_Survey_Page/Body.js';
import Get_Survey_Body from './Components/Get_Surveys_Page/Body.js';

import Web3 from 'web3';
import func from './contracts/FunctionalSurveys.json';
//import proxy from './contracts/ProxySurveys.json';

const web3 = new Web3(Web3.givenProvider);
const contractAddress = '0x8C131A6cE6bE2b3aBEF8c7D2adDB2e2c9A0e2d4f';
const surveysContract = new web3.eth.Contract(func.abi, contractAddress);

function App() {
  const [title, setTitle] = useState(undefined);
  const [questions, setQuestions] = useState([]);
  const [value, setValue] = useState(undefined);
  const [maxParticipants, setMaxParticipants] = useState(undefined);

  return (
    <Router>
      <Header />
      <Switch>

        <Route exact path="/">
          <h1>this is first page</h1>
        </Route>

        <Route path="/home">
          <h1>this is home page</h1>
        </Route>

        <Route path="/startSurveys">
          <Set_Survey_Body
            key='body'

            title={title}
            setTitle={setTitle}

            questions={questions}
            setQuestions={setQuestions}

            value={value}
            maxParticipants={maxParticipants}
            setValue={setValue}
            setMaxParticipants={setMaxParticipants}

            surveysContract={surveysContract}
          />
        </Route>

        <Route path="/participateSurveys">
          <h1>this is participate survey page</h1>
          <Get_Survey_Body 
            surveysContract={surveysContract}
          />
        </Route>

        <Route path="/aboutUs">
          <h1>this is about page</h1>
          <p>
            This is a paragraph about us
          </p>
        </Route>
        
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
