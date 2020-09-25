import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

const Input = styled.input`
	width: 25em;
	display: inline-block;
	margin-top: 2px;
	margin-bottom: 15px;
`;

const Button = styled.button`
	width: 29em;
	display: inline-block;
`;

function ShowSelcetedSurvey(props) {

	const [answers, setAnswers] = useState({});

	const updateAnswers = (event) => {
		event.preventDefault();
		answers[event.target.name] = event.target.value;
	}

	const sendAnswer = async (event) => {
		event.preventDefault();
		let answer = answers[props.surveyQuestions[props.selectedSurvey][0]];
		for (var i = 1; i < props.surveyQuestions[props.selectedSurvey].length; i++)
			answer += ',' + answers[props.surveyQuestions[props.selectedSurvey][i]];
		await props.surveysContract.methods.answerSurvey(props.selectedSurvey, answer).send({ from: props.userAddress })
			.then(() => {
				setAnswers({})
				props.setShowSurvey(false);
				props.setSelectedSurvey(undefined);
			});
	}

	const showAlert = () => {
		alert('Complete the inputs');
	}

	return (
		<>
			{
				props.surveyQuestions[props.selectedSurvey] !== undefined ?
					props.surveyQuestions[props.selectedSurvey]
						.map((val) =>
							<React.Fragment key={uuidv4()}>
								<h4 className="card-title">{val}</h4>
								<Input type="text" className="form-control" name={val} placeholder="Your Answer" onChange={updateAnswers} />
							</React.Fragment>
						)
					: <></>
			}
			<Button type="button" className="btn btn-primary" onClick={sendAnswer}>Submit</Button>
		</>
	);
}

export default ShowSelcetedSurvey;