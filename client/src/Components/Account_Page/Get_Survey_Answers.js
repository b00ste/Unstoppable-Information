import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function GetSurveyAnswers(props) {

	const getSurveyAnswers = async () => {
		let newSurveyAnswers;
		let surveyTotalParticipants = await props.surveysContract.methods.getSurveyTotalParticipants(props.selectedSurvey).call({ from: props.userAddress });
		newSurveyAnswers = [];
		for (let i = 0; i < surveyTotalParticipants; i++) {
			let surveyAnswer = await props.surveysContract.methods.getSurveyAnswers(props.selectedSurvey, i).call({ from: props.userAddress });
			newSurveyAnswers.push(surveyAnswer);
		}
		props.setSurveyAnswers(newSurveyAnswers);
	}

	useEffect(() => {
		if (props.surveyAnswers === undefined && props.showSurvey) {
			getSurveyAnswers();
		}
	});

	return (
		<>
			{
				props.surveyAnswers !== undefined
					? props.surveyAnswers.map(val => <p key={uuidv4()}>{val}</p>)
					: <></>
			}
		</>
	);
}

export default GetSurveyAnswers;