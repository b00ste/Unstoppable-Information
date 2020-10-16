import React from 'react';
import useStorage from './Components/Hooks/useStorage.js';
import { BrowserRouter as Router } from 'react-router-dom';

import Connect from './Components/Connect.js';
import Header from './Components/Header/Header.js';
import Footer from './Components/Footer.js';
import MainBody from './Components/MainBody.js';

import Web3 from 'web3';
import surveyFunc from './contracts/SurveyFunc.json';
import pollFunc from './contracts/PollFunc.json';
import token from './contracts/Token.json';

const web3 = new Web3(Web3.givenProvider);

const tokenAddress = '0x9F668FaeA6ef654279A7d4e8Cd545cD85A0FE845';
const tokenContract = new web3.eth.Contract(token.abi, tokenAddress);

const surveysAddress = '0x1bF57A4cB06fD0f759cb4dcB7c9D00526dfbcBe4';
const surveysContract = new web3.eth.Contract(surveyFunc.abi, surveysAddress);

const pollAddress = '0xF07d94D4e395EA9039FB1fFe4d28477a9a00bE1B';
const pollContract = new web3.eth.Contract(pollFunc.abi, pollAddress);

function App() {

  const [storage, setStorage] = useStorage();

  return (
    <Router>
      <MainBody
        storage={storage}
        setStorage={setStorage}
        tokenContract={tokenContract}
        surveysAddress={surveysAddress}
        surveysContract={surveysContract}
        pollAddress={pollAddress}
        pollContract={pollContract}
      />
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
