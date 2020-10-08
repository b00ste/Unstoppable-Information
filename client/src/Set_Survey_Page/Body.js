import React from 'react';
import styled from 'styled-components';
import SurveyQuestions from './SurveyQuestions.js';
import SurveyTitle from './SurveyTitle.js';
import SurveyValue from './SurveyValue.js';
import SurveyParticipants from './SurveyParticipants.js';
import SetButtons from './SetButtons.js';

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

function Body({ surveysContract, tokenContract, surveysAddress, storage, setStorage }) {
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
		await surveysContract.methods.setSurvey(storage.titles, questions.join(), storage.maxParticipants, storage.value).send({ from: storage.userAddress })
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
				<SurveyTitle
					storage={storage}
					setStorage={setStorage}
				/>
				<SurveyValue
					storage={storage}
					setStorage={setStorage}
				/>
				<SurveyParticipants
					storage={storage}
					setStorage={setStorage}
				/>
			</Container>
			<Container>
				<SurveyQuestions
					storage={storage}
					setStorage={setStorage}
				/>
			</Container>
			<Container>
				<SetButtons
					storage={storage}
					setStorage={setStorage}
					surveysAddress={surveysAddress}
					tokenContract={tokenContract}

					approve={approve}
					setNewSurvey={setNewSurvey}
				/>
			</Container>
		</>
	);
}

export default Body;