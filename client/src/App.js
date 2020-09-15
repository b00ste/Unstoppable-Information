import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'bootswatch/dist/lux/bootstrap.min.css';

import Web3 from 'web3';
import func from './contracts/FunctionalSurveys.json';
import proxy from './contracts/ProxySurveys.json';

import Header from './Components/Header.js';
import Body from './Components/Body.js';

const web3 = new Web3(Web3.givenProvider);
const contractAddress = '';
const surveysContract = new web3.eth.Contract(func.abi, contractAddress);



function App() {
  const [options, setOptions] = useState([]);
  
  const account = async () => {
    const accounts = await window.ethereum.enable();
    return accounts[0];
  }

  let newOptionValue = '';
  const addNewOptionValue = (event) => {
      event.preventDefault();
      newOptionValue = event.target.value;
  }
  const addNewOption = (event) => {
      event.preventDefault();
      let newOptions = [...options];
      newOptions.push(newOptionValue);
      setOptions(newOptions);
  }
  
  useEffect(() => {
    account();
  });

  return (
    <>
      <Header />
      <Body options={options} addNewOptionValue={addNewOptionValue} addNewOption={addNewOption} />
    </>
  );
}

export default App;
