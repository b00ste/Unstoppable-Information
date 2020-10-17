import React from 'react';
import styled from 'styled-components';
import Questions from './SetChoices.js';
import Title from './SetTitle.js';
import Value from './SetValue.js';
import Participants from './SetParticipants.js';
import Buttons from './SetButtons.js';

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-end;
	button {
		display: block;
		margin 2em;
		width: 18em;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.175);
	}
`;

function Body({
	storage,
	setStorage,
	pollAddress,
	pollContract,
	tokenContract
}) {
	const approve = async () => {
		await tokenContract.methods.authorizeOperator(pollAddress).send({ from: storage.userAddress });
	}
	const setNewPoll = async () => {
		setStorage({ ...storage, loading: true });
		const bytes32Chices = [];
		storage.choices.forEach(choice => {
			bytes32Chices.push(storage.utils.toHex(choice));
		});
		const bytes32Title = storage.utils.toHex(storage.pollTitle);
		pollContract.methods.setPoll(
			bytes32Title,
			bytes32Chices,
			storage.maxParticipants,
			storage.bigInt(storage.value).multiply(storage.bigInt(10).pow(18)).toString()
		).send({ from: storage.userAddress })
			.then(() => {
				setStorage({
					...storage,
					pollTitle: undefined,
					choices: undefined,
					value: undefined,
					maxParticipants: undefined,
					loading: false
				});
				for (let i = 0; i < 4; i++) {
					document.getElementsByTagName('input')[i].value = '';
				}
			})
			.catch(err => {
				setStorage({
					...storage,
					pollTitle: undefined,
					choices: undefined,
					value: undefined,
					maxParticipants: undefined,
					loading: false
				});
				for (let i = 0; i < 4; i++) {
					document.getElementsByTagName('input')[i].value = '';
				}
				alert(err.message);
			});
	}

	return (
		<>
			<Container>
				<Title
					storage={storage}
					setStorage={setStorage}
				/>
				<Value
					storage={storage}
					setStorage={setStorage}
				/>
				<Participants
					storage={storage}
					setStorage={setStorage}
				/>
			</Container>
			<Container>
				<Questions
					storage={storage}
					setStorage={setStorage}
				/>
			</Container>
			<Container>
				<Buttons
					storage={storage}
					setStorage={setStorage}
					tokenContract={tokenContract}
					pollAddress={pollAddress}

					approve={approve}
					setNewPoll={setNewPoll}
				/>
			</Container>
		</>
	);
}

export default Body;