import React, { useEffect } from 'react';

function GetSurveyQuestions(props) {

	const getSurveyQuestions = async () => {
		let newSurveyQuestions;
		newSurveyQuestions = await props.surveysContract.methods.getSurveyQuestions(props.selectedSurvey).call({ from: props.userAddress });
		props.setSurveyQuestions(newSurveyQuestions);
	}

	useEffect(() => {
		if (props.surveyQuestions === undefined && props.showSurvey) {
			getSurveyQuestions();
		}
	});

	return (
		<>
			<p>{props.surveyQuestions}</p>
		</>
	);
}

export default GetSurveyQuestions;