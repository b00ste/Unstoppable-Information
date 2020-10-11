import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function GetSurveyAnswers({ storage, setStorage, surveysContract }) {

	const getSurveyAnswers = async () => {
		setStorage({
			...storage,
			loading: true
		});
		let newAnswers = [];
		let surveyTotalParticipants = await surveysContract.methods.getSurveyTotalParticipants(storage.selectedSurvey).call({ from: storage.userAddress });
		for (let i = 0; i < surveyTotalParticipants; i++) {
			let surveyAnswer = await surveysContract.methods.getSurveyAnswers(storage.selectedSurvey, i).call({ from: storage.userAddress });
			newAnswers.push(surveyAnswer.replace(/\\"/g, ''));
		}
		setStorage({
			...storage,
			answers: newAnswers,
			loading: false
		});
	}

	useEffect(() => {
		if (storage.answers === undefined && storage.showSurvey) {
			getSurveyAnswers();
		}
	});

	return (
		<>
			{
				storage.answers !== undefined
					? storage.answers.map(val1 =>
						<tr className="table-light" key={uuidv4()}>
							{
								val1.split('","').map(val2 =>
									<th scope="col" key={uuidv4()}>{val2.replace(/"/g, '')}</th>
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