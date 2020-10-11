import React from 'react';
import styled from 'styled-components';
import Questions from '../Set_Poll_Or_Survey_Struct/SetQuestions.js';
import Title from '../Set_Poll_Or_Survey_Struct/SetTitle.js';
import Value from '../Set_Poll_Or_Survey_Struct/SetValue.js';
import Participants from '../Set_Poll_Or_Survey_Struct/SetParticipants.js';
import Buttons from '../Set_Poll_Or_Survey_Struct/SetButtons.js';

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
		let questions = [];
		for (var i = 0; i < questions.length; i++) {
			const escaped = ('' + questions[i]).replace(/"/g, '\\"');
			questions.push(`"${escaped}"`);
		}
		pollContract.methods.setPoll(storage.pollTitle, questions.join(), storage.maxParticipants, storage.value).send({ from: storage.userAddress })
			.then(() => {
				setStorage({
					...storage,
					pollTitle: undefined,
					questions: undefined,
					value: undefined,
					maxParticipants: undefined,
					loading: false
				});
				for(let i = 0; i < 4; i++){
					document.getElementsByTagName('input')[i].value = '';
				}
			})
			.catch(err => {
				setStorage({
					...storage,
					pollTitle: undefined,
					questions: undefined,
					value: undefined,
					maxParticipants: undefined,
					loading: false
				});
				for(let i = 0; i < 4; i++){
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
					is="poll"
				/>
				<Value
					storage={storage}
					setStorage={setStorage}
					is="poll"
				/>
				<Participants
					storage={storage}
					setStorage={setStorage}
					is="poll"
				/>
			</Container>
			<Container>
				<Questions
					storage={storage}
					setStorage={setStorage}
					is="poll"
				/>
			</Container>
			<Container>
				<Buttons
					storage={storage}
					setStorage={setStorage}
					tokenContract={tokenContract}
					pollAddress={pollAddress}
					is="poll"

					approve={approve}
					sendToBC={setNewPoll}
				/>
			</Container>
		</>
	);
}

export default Body;