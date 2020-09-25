import React, { useEffect } from 'react';

function GetSurveyQuestions(props) {

	const getSurveyQuestions = async () => {
		let newUserSurveyQuestions;
		newUserSurveyQuestions = await props.surveysContract.methods.getSurveyQuestions(props.selectedSurvey).call({ from: props.userAddress });
		props.setUserSurveyQuestions(newUserSurveyQuestions);
	}

	useEffect(() => {
		if (props.userSurveyQuestions === undefined && props.showSurvey) {
			getSurveyQuestions();
		}
	});

	return (
		<>
			<p>{props.userSurveyQuestions}</p>
		</>
	);
}

export default GetSurveyQuestions;