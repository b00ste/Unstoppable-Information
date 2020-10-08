import React from 'react';
import styled from 'styled-components';
import Web3 from 'web3';
import surveyFunc from '../contracts/FunctionalSurveys.json';
import token from '../contracts/TokenSurveys.json';
const web3 = new Web3(Web3.givenProvider);
const tAddress = '0xA6DEe4BCdaFA3E5e66F2A8Fe1e4BEd9082B8bB40';
const tContract = new web3.eth.Contract(token.abi, tAddress);
const sAddress = '0x507Be3C79DAf1C7df43827F22A2114CeA60B0E6b';
const sContract = new web3.eth.Contract(surveyFunc.abi, sContract);

const Survey = styled.div`
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);

	background-color: white;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	height: 18rem;
	width: 20rem;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	border: 0px;

	button {
		margin: 0.75em 0em 0.1em 0em;
	}
	p {
		margin: 0.1em 0.75em;
	}
`;

const SurveyMask = styled.div`
	position: fixed;
	background-color: rgba(0,0,0,0.5);
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
`;

function Connect({ storage, setStorage }) {
	const _connect = async () => {
		window.ethereum.request({ method: 'eth_requestAccounts' })
			.then((accounts) => {
				setStorage({
					...storage,
					userAddress: accounts[0],
					token: tContract,
					tokenAddress: tAddress,
					surveys: sContract,
					surveysAddress: sAddress,
					connected: true
				});
			});
	}

	let connect;
	let connectMask;
	if (!storage.connected) {
		connect =
			<Survey>
				<p>In order for you to use this app, you need to connect to your ethereum wallet through metamask.</p>
				<p>By using our app you agree that anyinformation you submit through surveys or polls is public information and anyone can use it for or against you.</p>
				<p>We are not responsible for the misusing of the informations you provide our app.</p>
				<button type="button" className="btn btn-info" onClick={_connect}>Connect</button>
			</Survey>
		connectMask = <SurveyMask></SurveyMask>
	}

	return (
		<>
			{connectMask}
			{connect}
		</>
	);
}

export default Connect;