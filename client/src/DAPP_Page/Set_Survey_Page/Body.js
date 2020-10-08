import React from 'react';
import styled from 'styled-components';
import Questions from './SetQuestions.js';
import Title from './SetTitle.js';
import Value from './SetValue.js';
import Participants from './SetParticipants.js';
import Buttons from './SetButtons.js';

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

function Body({ storage, setStorage }) {
	const approve = async () => {
		await storage.tokenContract.methods.authorizeOperator(storage.surveysAddress).send({ from: storage.userAddress });
	}
	const setNewSurvey = async () => {
		setStorage({ ...storage, loading: true });
		let questions = [];
		for (var i = 0; i < questions.length; i++) {
			const escaped = ('' + questions[i]).replace(/"/g, '\\"');
			questions.push(`"${escaped}"`);
		}
		await storage.surveysContract.methods.setSurvey(storage.SurveyTitle, questions.join(), storage.maxParticipants, storage.value).send({ from: storage.userAddress })
			.then(() => {
				setStorage({
					...storage,
					titles: undefined,
					questions: undefined,
					value: undefined,
					maxParticipants: undefined,
					loading: false
				});
			})
			.catch(err => alert(err));
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

					approve={approve}
					setNewSurvey={setNewSurvey}
				/>
			</Container>
		</>
	);
}

export default Body;