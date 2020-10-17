import React, { useEffect } from 'react';
import styled from 'styled-components';

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
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.175);
	}
	p {
		margin: 0.1em 0.75em;
	}
`;

const SurveyMask = styled.div`
	position: fixed;
	background-color: rgba(0,0,0,0.6);
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
`;

function Connect({ storage, setStorage }) {
	const _connect = async () => {
		await window.ethereum.request({ method: 'eth_requestAccounts' });
	}

	let connect;
	let connectMask;
	if (!storage.connected) {
		connect =
			<Survey>
				<p>In order for you to use this app, you need to connect to your ethereum wallet through metamask.</p>
				<p>By using our app you agree that any information you submit is public information and anyone can use it for or against you.</p>
				<p>We are not responsible for the misuse of the informations you provide our app.</p>
				<button type="button" onClick={_connect}>Connect</button>
			</Survey>
		connectMask = <SurveyMask></SurveyMask>
	}

	useEffect(() => {
		if (typeof window.ethereum !== 'undefined'
			|| (typeof window.web3 !== 'undefined')) {
			if (storage.userAddress === undefined) {
				setStorage({ ...storage, connected: false, provider: window.ethereum })
				window.ethereum.send('eth_accounts')
					.then((res) => {
						if (res.result[0] !== undefined) {
							setStorage({
								...storage,
								userAddress: res.result[0],
								loading: false,
								connected: true
							});
						}
						else {
							setStorage({ ...storage, connected: false });
						}
					}
					).catch((err) => {
						if (err.code === 4100) {
							console.log('Please connect to MetaMask.')
						} else {
							console.error(err)
						}
					});
			}

			const provider = window.ethereum;
			console.log(provider);

			provider.on('accountsChanged', function (accounts) {
				console.log("accounts changed");
				setStorage({ ...storage, userAddress: accounts[0] });
				console.log(accounts[0]);
			});

			provider.on('chainChanged', function (chain) {
				console.log('chain changed');
				console.log(chain);
			});
		}
		else {
			console.log('MetaMask is not installed!');
		}
	}, [window['ethereum']]);

	return (
		<>
			{connectMask}
			{connect}
		</>
	);
}

export default Connect;