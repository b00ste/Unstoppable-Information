import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function GetSurveyAnswers({ storage, setStorage, surveysContract }) {

	const getSurveyAnswers = async () => {
		setStorage({
			...storage,
			loading: true
		});
		let surveyTotalParticipants = await surveysContract.methods.getSurveyUintStorage(storage.utils.asciiToHex(storage.selectedSurvey), 'totalParticipated').call();
		let newStringAnswers = [];
		for (let i = 0; i < surveyTotalParticipants; i++) {
			const newBytes32OneUserAnswers = await surveysContract.methods.getSurveyUintToBytes32ArrayStorage(storage.utils.asciiToHex(storage.selectedSurvey), i).call();
			newStringAnswers[i] = [];
			newBytes32OneUserAnswers.forEach(oneUserAnswer => {
				newStringAnswers[i].push(storage.utils.hexToUtf8(oneUserAnswer));
			});
		}
		console.log(newStringAnswers);
		setStorage({
			...storage,
			answers: newStringAnswers,
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
						<tr key={uuidv4()}>
							{
								val1.map(val2 =>
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