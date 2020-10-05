import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

const Input = styled.input`
	width: 25em;
	display: inline-block;
	margin-top: 2px;
	margin-bottom: 15px;
`;

function GetSurveyQuestions(props) {

	const getSurveyQuestions = async () => {
		props.setLoading(true);
		let newSurveyQuestions = await props.surveysContract.methods.getSurveyQuestions(props.selectedSurvey).call({ from: props.userAddress });
		props.setSurveyQuestions(newSurveyQuestions.replace(/\\"/g, '').replace(/"/g, ''));
	}

	useEffect(() => {
		if (props.surveyQuestions === undefined && props.showSurvey && props.selectedSurvey !== undefined) {
			getSurveyQuestions().then(() => props.setLoading(false));
		}
	});

	return (
		<>
			
			{
				props.surveyQuestions !== undefined ?
					props.surveyQuestions.split(',')
						.map((val) =>
							<React.Fragment key={uuidv4()}>
								<h4 className="card-title">{val}</h4>
								<Input type="text" className="form-control" name={val} placeholder="Your Answer" onChange={props.updateAnswers} />
							</React.Fragment>
						)
					: <></>
			}
		</>
	);
}

export default GetSurveyQuestions;