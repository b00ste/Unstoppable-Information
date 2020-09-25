import React, { useEffect } from 'react';
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider);

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
		<></>
	);
}

export default GetBalance;