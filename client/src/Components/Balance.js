import React, { useEffect } from 'react';
import Web3 from 'web3';
import styled from 'styled-components';

const web3 = new Web3(Web3.givenProvider);

const H6 = styled.h6`
	position: absolute;
	right: 0;
	color: #fff;
	margin: 1em;
`;

function GetBalance(props) {
	const getBalance = async () => {
		props.setLoading(true);
		let newBalance;
		if (web3.utils.isAddress(props.userAddress))
			newBalance = (await props.surveysContract.methods.balanceOf(props.userAddress).call() / 10 ** 18);
		props.setBalance(newBalance);
	}

	useEffect(() => {
		if (props.balance === undefined)
			getBalance().then( () => props.setLoading(false) );
	});

	return(
		<>
			{props.balance !== undefined ? <H6>Balance: {props.balance} SVT</H6> : <></>}
		</>
	);
}

export default GetBalance;