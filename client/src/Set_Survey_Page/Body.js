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

function Body(props) {
	const approve = async () => {
		await props.tokenContract.methods.authorizeOperator(props.surveysAddress).send({ from: props.userAddress });
	}
	const setNewSurvey = async () => {
		props.setLoading(true);
		let questions = [];
		for (var i = 0; i < props.questions.length; i++) {
			const escaped = ('' + props.questions[i]).replace(/"/g, '\\"');
			questions.push(`"${escaped}"`);
		}
		console.log(questions);
		await props.surveysContract.methods.setSurvey(props.title, questions.join(), props.maxParticipants, props.value).send({ from: props.userAddress })
			.then(() => {
				props.setTitle(undefined);
				props.setQuestions([]);
				props.setValue(undefined);
				props.setMaxParticipants(undefined);
				props.setLoading(false);
			});
	}

	return (
		<>
			<Container>
				<SurveyTitle
					title={props.title}
					setTitle={props.setTitle}
				/>
				<SurveyValue
					value={props.value}
					setValue={props.setValue}
				/>
				<SurveyParticipants
					maxParticipants={props.maxParticipants}
					setMaxParticipants={props.setMaxParticipants}
				/>
			</Container>
			<Container>
				<SurveyQuestions
					questions={props.questions}
					setQuestions={props.setQuestions}
				/>
			</Container>
			<Container>
				<SetButtons
					surveysAddress={props.surveysAddress}
					tokenContract={props.tokenContract}
					userAddress={props.userAddress}

					approve={approve}
					setNewSurvey={setNewSurvey}
				/>
			</Container>
		</>
	);
}

export default Body;