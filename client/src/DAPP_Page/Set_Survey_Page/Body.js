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
	surveysAddress,
	surveysContract,
	tokenContract
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