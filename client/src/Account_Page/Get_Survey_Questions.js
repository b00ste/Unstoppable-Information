import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function GetSurveyQuestions(props) {

	const getSurveyQuestions = async () => {
		props.setLoading(true)
		let newSurveyQuestions;
		newSurveyQuestions = await props.surveysContract.methods.getSurveyQuestions(props.selectedSurvey).call({ from: props.userAddress });
		props.setSurveyQuestions(newSurveyQuestions.replace(/\\"/g, '').replace(/"/g, ''));
	}

	useEffect(() => {
		if (props.surveyQuestions === undefined && props.showSurvey) {
			getSurveyQuestions().then( () => props.setLoading(false) );
		}
	});

	return (
		<>
			{
				props.surveyQuestions !== undefined
					? props.surveyQuestions.split(',').map( val => 
						<th scope="col" key={uuidv4()}>{val}</th>
					)
					: <></>
			}
		</>
	);
}

export default GetSurveyQuestions;