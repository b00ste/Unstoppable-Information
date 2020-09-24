import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider);

function Body(props) {
	const [nrOfSurveys, setNrOfSurveys] = useState(undefined);
	const [surveys, setSurveys] = useState(undefined);
	const [balance, setBalance] = useState(undefined);
	
	const getUSerInfo = async () => {
		const newNumberOfSurveys = await props.surveysContract.methods.getUserCreatedSurveys().call({from: props.account});
		setNrOfSurveys(newNumberOfSurveys);
		const newSurveys = [];
		for(let i = 0; i < newNumberOfSurveys; i++) {
			newSurveys.push(await props.surveysContract.methods.getUserSurveyOfNumber(i).call({from: props.account}));
		}
		setSurveys(newSurveys);
		let newBalance;
		if(web3.utils.isAddress(props.account))
			newBalance = await props.surveysContract.methods.balanceOf(props.account).call();
		setBalance(newBalance/10**18);
	}

	useEffect(() => {
		if(nrOfSurveys === undefined)
			getUSerInfo();
	})

	return(
	<>
		<p>{nrOfSurveys}</p>
		{ surveys !== undefined ? surveys.map( val => <p key={uuidv4()}>{val}</p> ) : <></> }
		<p>{balance !== undefined ? balance : <></>}</p>
	</>
	);
}

export default Body;