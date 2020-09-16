import React, { useState } from 'react';
import 'bootswatch/dist/lux/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Header from './Components/Header.js';
import Body from './Components/Set_Survey_Page/Body.js';

import Web3 from 'web3';
import func from './contracts/FunctionalSurveys.json';
//import proxy from './contracts/ProxySurveys.json';

const web3 = new Web3(Web3.givenProvider);
const contractAddress = '0xf49bed35a1c77FDf3889895A205B0Acb169B7546';
const surveysContract = new web3.eth.Contract(func.abi, contractAddress);

function App() {
  const [title, setTitle] = useState(undefined);
  const [options, setOptions] = useState([]);
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
          <Body
            key='body'

            title={title}
            setTitle={setTitle}

            options={options}
            setOptions={setOptions}

            value={value}
            maxParticipants={maxParticipants}
            setValue={setValue}
            setMaxParticipants={setMaxParticipants}

            surveysContract={surveysContract}
          />
        </Route>

        <Route path="/participateSurveys">
          <h1>this is participare survey page</h1>
        </Route>

        <Route path="/aboutUs">
          <h1>this is about page</h1>
          <p>
            This is a paragraph about us
          </p>
        </Route>
        
      </Switch>
    </Router>
  );
}

export default App;
