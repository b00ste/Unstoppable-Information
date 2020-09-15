import React, { useState } from 'react';
import 'bootswatch/dist/lux/bootstrap.min.css';

import Header from './Components/Header.js';
import Body from './Components/Colomns/Body.js';

import Web3 from 'web3';
import func from './contracts/FunctionalSurveys.json';
import proxy from './contracts/ProxySurveys.json';

const web3 = new Web3(Web3.givenProvider);
const contractAddress = '0x8C131A6cE6bE2b3aBEF8c7D2adDB2e2c9A0e2d4f';
const surveysContract = new web3.eth.Contract(func.abi, contractAddress);

function App() {
  const [title, setTitle] = useState(undefined);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(undefined);
  const [maxParticipants, setMaxParticipants] = useState(undefined);

  let newOptionValue;
  const saveNewOptionValue = (event) => {
    event.preventDefault();
    newOptionValue = event.target.value;
  }
  const addNewOption = (event) => {
    event.preventDefault();
    let newOptions = [...options];
    newOptions.push(newOptionValue);
    setOptions(newOptions);
  }

  let newTitleValue;
  const saveNewTitleValue = (event) => {
    event.preventDefault();
    newTitleValue = event.target.value;
  }
  const addNewTitle = (event) => {
    event.preventDefault();
    setTitle(newTitleValue);
  }

  let newValue;
  let newMaxParticipants;
  const saveNewValue = (event) => {
    event.preventDefault();
    newValue = event.target.value;
  }
  const saveNewMaxParticipants = (event) => {
    event.preventDefault();
    newMaxParticipants = event.target.value;
  }
  const addNewValueAndMaxParticipants = (event) => {
    event.preventDefault();
    setValue(newValue);
    setMaxParticipants(newMaxParticipants);
  }

  const setNewSurvey = async (event) => {
    event.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    let questions = options[0];
    for(var i = 1; i < options.length; i ++)
      questions += '-' + options[i];
    console.log(questions);
    const gas = await surveysContract.methods.setSurevey(title, questions, maxParticipants, value).estimateGas();
    console.log(gas);
    const result = await surveysContract.methods.setSurevey(title, questions, maxParticipants, value).send({ from: account, gas });
    console.log(result);
  }

  return (
    <>
      <Header />
      <Body
        options={options}
        addNewOption={addNewOption}
        saveNewOptionValue={saveNewOptionValue}

        title={title}
        addNewTitle={addNewTitle}
        saveNewTitleValue={saveNewTitleValue}

        value={value}
        maxParticipants={maxParticipants}
        saveNewValue={saveNewValue}
        saveNewMaxParticipants={saveNewMaxParticipants}
        addNewValueAndMaxParticipants={addNewValueAndMaxParticipants}

        setNewSurvey={setNewSurvey}
      />
    </>
  );
}

export default App;
