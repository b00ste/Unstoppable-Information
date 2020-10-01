import React, { useEffect } from 'react';
import styled from 'styled-components';
import SurveyQuestions from './Get_Survey_Questions'

const Button = styled.button`
	width: 29em;
	display: block;
`;

function Data(props) {

	const updateAnswers = (event) => {
		event.preventDefault();
		props.surveyAnswers[event.target.name] = event.target.value;
	}

	const sendAnswer = async (event) => {
		event.preventDefault();
		props.setLoading(true);
		let questions = props.surveyQuestions.split(',');
		let answer = props.surveyAnswers[questions[0]]
		for (var i = 1; i < questions.length; i++)
			answer += ',' + props.surveyAnswers[questions[i]];
		await props.surveysContract.methods.answerSurvey(props.selectedSurvey, answer).send({ from: props.userAddress })
			.then(() => {
				props.setSurveyAnswers({})
				props.setShowSurvey(false);
				props.setSelectedSurvey(undefined);
				props.setSurveyQuestions(undefined);
				props.setLoading(false);
			});
	}

	useEffect(() => {
		if(props.surveyAnswers === undefined)
			props.setSurveyAnswers({});
	})

	return (
		<>
			<SurveyQuestions
				showSurvey={props.showSurvey}
				selectedSurvey={props.selectedSurvey}
				surveyQuestions={props.surveyQuestions}
				setSurveyQuestions={props.setSurveyQuestions}
				surveysContract={props.surveysContract}
				userAddress={props.userAddress}
				updateAnswers={updateAnswers}
				setLoading={props.setLoading}
			/>
			<Button type="button" className="btn btn-primary" onClick={sendAnswer}>Submit</Button>
		</>
	);
}

export default Data;