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

const tokenAddress = '0x4eC6500ec08DdD7200774Ee6d6701A131E5D2911';
const tokenContract = new web3.eth.Contract(token.abi, tokenAddress);

const surveysAddress = '0xB06936eB744ddC8653a5c2b2D742cDe33363eb0c';
const surveysContract = new web3.eth.Contract(surveyFunc.abi, surveysAddress);

const pollAddress = '0x9a7e625aC7393Ec5203F3A71D08E577b7C01C50b';
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
