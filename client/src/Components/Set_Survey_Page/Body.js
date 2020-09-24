import React from 'react';
import styled from 'styled-components';
import SurveyQuestions from './SurveyQuestions.js'
import SurveyTitle from './SurveyTitle.js'
import SurveyValue from './SurveyValue.js'

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-end;
	div {
		max-width: 400px;
		word-wrap: break-word;
		margin-top: 2.5rem;
		margin-bottom: 2.5rem;
		text-align: center;
	button {
		display: inline-block;
		margin 5px;
		width: 300px;
	}
}
`;

function Body(props) {
	const setNewSurvey = async () => {
		let questions = props.questions[0];
		for (var i = 1; i < props.questions.length; i++)
			questions += ',' + props.questions[i];
		await props.surveysContract.methods.setSurvey(props.title, questions, props.maxParticipants, props.value).send({ from: props.account })
			.then(() => {
				props.setTitle(undefined);
				props.setQuestions([]);
				props.setValue(undefined);
				props.setMaxParticipants(undefined);
			});
	}

	if (props.title && props.questions && props.maxParticipants && props.value) {
		setNewSurvey();
	}

	return (
		<Container>
			<SurveyTitle
				title={props.title}
				setTitle={props.setTitle}
			/>
			<SurveyQuestions
				questions={props.questions}
				setQuestions={props.setQuestions}
			/>
			<SurveyValue
				value={props.value}
				maxParticipants={props.maxParticipants}
				setValue={props.setValue}
				setMaxParticipants={props.setMaxParticipants}
			/>
		</Container>
	);
}

export default Body;