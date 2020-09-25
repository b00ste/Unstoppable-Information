import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function GetSurveyAnswers(props) {

	const getSurveyAnswers = async () => {
		let newUserSurveyAnswers;
		let surveyTotalParticipants = await props.surveysContract.methods.getSurveyTotalParticipants(props.selectedSurvey).call({ from: props.userAddress });
		newUserSurveyAnswers = [];
		for (let i = 0; i < surveyTotalParticipants; i++) {
			let surveyAnswer = await props.surveysContract.methods.getSurveyAnswers(props.selectedSurvey, i).call({ from: props.userAddress });
			newUserSurveyAnswers.push(surveyAnswer);
		}
		props.setUserSurveyAnswers(newUserSurveyAnswers);
	}

	useEffect(() => {
		if (props.userSurveyAnswers === undefined && props.showSurvey) {
			getSurveyAnswers();
		}
	});

	return (
		<>
			{
				props.userSurveyAnswers !== undefined
					? props.userSurveyAnswers.map(val => <p key={uuidv4()}>{val}</p>)
					: <></>
			}
		</>
	);
}

export default GetSurveyAnswers;