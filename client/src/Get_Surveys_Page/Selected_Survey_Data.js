import React from 'react';
import styled from 'styled-components';
import SurveyQuestions from './Get_Survey_Questions'

const Button = styled.button`
	width: 29em;
	display: block;
`;

function Data({ storage, setStorage, surveysContract }) {

	let newAnswers = {};
	const updateAnswers = (event) => {
		event.preventDefault();
		newAnswers[event.target.name] = event.target.value;
	}

	const sendAnswer = async (event) => {
		event.preventDefault();
		setStorage({
			...storage,
			loading: true,
		});
		let questions = storage.questions.split(',');
		let answer = [];
		for (var i = 0; i < questions.length; i++) {
			const escaped = ('' + newAnswers[questions[i]]).replace(/"/g, '\\"');
			console.log(escaped);
			answer.push(`"${escaped}"`);
		}
		console.log(answer.join());
		await surveysContract.methods.surveyParticipation(storage.selectedSurvey, answer.join()).send({ from: storage.userAddress })
			.then(() =>
				setStorage({
					...storage,
					answers: undefined,
					showSurvey: false,
					selectedSurvey: undefined,
					questions: undefined,
					loading: false
				})
			);
	}

	return (
		<>
			<SurveyQuestions
				storage={storage}
				setStorage={setStorage}
				updateAnswers={updateAnswers}
				surveysContract={surveysContract}
			/>
			<Button type="button" className="btn btn-primary" onClick={sendAnswer}>Submit</Button>
		</>
	);
}

export default Data;