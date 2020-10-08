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
	div {
		width: 25em;
		max-height: 23em;
		margin-top: 2.5rem;
		text-align: center;
		div {
			overflow-y: auto;
		}
	}
	button {
		display: inline-block;
		margin 5px;
		width: 23em;
	}
	input {
		display: inline-block;
  	margin 5px;
  	width: 20em;
	}
}
`;

function Body({
	storage,
	setStorage,
	surveysContract,
	tokenContract,
	surveysAddress
}) {
	const approve = async () => {
		await tokenContract.methods.authorizeOperator(surveysAddress).send({ from: storage.userAddress });
	}
	const setNewSurvey = async () => {
		setStorage({ ...storage, loading: true });
		let questions = [];
		for (var i = 0; i < questions.length; i++) {
			const escaped = ('' + questions[i]).replace(/"/g, '\\"');
			questions.push(`"${escaped}"`);
		}
		surveysContract.methods.setSurvey(storage.surveyTitle, questions.join(), storage.maxParticipants, storage.value).send({ from: storage.userAddress })
			.then(() => {
				setStorage({
					...storage,
					surveyTitle: undefined,
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
					surveyTitle: undefined,
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
					is="survey"
				/>
				<Value
					storage={storage}
					setStorage={setStorage}
					is="survey"
				/>
				<Participants
					storage={storage}
					setStorage={setStorage}
					is="survey"
				/>
			</Container>
			<Container>
				<Questions
					storage={storage}
					setStorage={setStorage}
					is="survey"
				/>
			</Container>
			<Container>
				<Buttons
					storage={storage}
					setStorage={setStorage}
					surveysAddress={surveysAddress}
					tokenContract={tokenContract}
					is="survey"

					approve={approve}
					sendToBC={setNewSurvey}
				/>
			</Container>
		</>
	);
}

export default Body;