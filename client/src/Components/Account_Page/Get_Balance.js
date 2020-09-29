import React, { useEffect } from 'react';
import Web3 from 'web3';
import styled from 'styled-components';

const web3 = new Web3(Web3.givenProvider);

const Div = styled.div`
	position: relative;
	h5 {
		position: absolute;
		top: 0;
		right: 0;
		padding: 0.5em;
	}
`;

function GetBalance(props) {
	const getBalance = async () => {
		let newBalance;
		if (web3.utils.isAddress(props.userAddress))
			newBalance = (await props.surveysContract.methods.balanceOf(props.userAddress).call() / 10 ** 18);
		props.setBalance(newBalance);
	}

	useEffect(() => {
		if (props.balance === undefined)
			getBalance();
	});

	return(
		<Div>
			{props.balance !== undefined ? <h5>Balance: {props.balance} SVT</h5> : <></>}
		</Div>
	);
}

export default GetBalance;