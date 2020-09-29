import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function GetSurveyAnswers(props) {

	const getSurveyAnswers = async () => {
		props.setLoading(true)
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
			getSurveyAnswers().then(() => props.setLoading(false));
		}
	});

	return (
		<>
			{
				props.surveyAnswers !== undefined
					? props.surveyAnswers.map(val1 =>
						<tr className="table-primary" key={uuidv4()}>
							{
								val1.split(',').map(val2 =>
									<th scope="col" key={uuidv4()}>{val2}</th>
								)
							}
						</tr>
					)
					: <></>
			}
		</>
	);
}

export default GetSurveyAnswers;