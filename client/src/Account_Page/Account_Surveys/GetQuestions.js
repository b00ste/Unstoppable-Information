import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function GetSurveyQuestions({ storage, setStorage, surveysContract }) {

	const getSurveyQuestions = async () => {
		setStorage({
			...storage,
			loading: true
		});
		const newBytes32Questions = await surveysContract.methods.getSurveyStringToBytes32ArrayStorage(storage.utils.asciiToHex(storage.selectedSurvey), 'questions').call();
		const newStringQuestions = [];
		newBytes32Questions.forEach(question => {
			newStringQuestions.push(storage.utils.hexToUtf8(question));
		});
		setStorage({
			...storage,
			questions: newStringQuestions,
			loading: false
		});
	}

	useEffect(() => {
		if (storage.questions === undefined && storage.showSurvey) {
			getSurveyQuestions();
		}
	});

	return (
		<>
			{
				storage.questions !== undefined
					? storage.questions.map(val =>
						<th scope="col" key={uuidv4()}>{val}</th>
					)
					: <></>
			}
		</>
	);
}

export default GetSurveyQuestions;