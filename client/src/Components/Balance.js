import React, { useEffect } from 'react';
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider);

function GetBalance({ storage, setStorage, tokenContract }) {
	const getBalance = async () => {
		setStorage({ ...storage, loading: true });
		if (web3.utils.isAddress(storage.userAddress)) {
			await tokenContract.methods.balanceOf(storage.userAddress).call().then((newBalance) => {
				setStorage({ ...storage, balance: newBalance / 10 ** 18, loading: false });
			})
		}
	}

	useEffect(() => {
		if (storage.balance === undefined) {
			getBalance();
		}
	}, [getBalance, storage.balance]);

	return (
		<>
			{storage.balance !== undefined ? <p className="balance">Balance: {storage.balance} SVT</p> : <></>}
		</>
	);
}

export default GetBalance;