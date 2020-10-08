import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function GetSurveyQuestions({ storage, setStorage, surveysContract }) {

	const getSurveyQuestions = async () => {
		setStorage({
			...storage,
			loading: true
		});
		//let newQuestions = await surveysContract.methods.getSurveyQuestions(storage.selectedSurvey).call();
		surveysContract.methods.getSurveyQuestions(storage.selectedSurvey).call()
			.then((newQuestions) => {
				setStorage({
					...storage,
					questions: newQuestions.replace(/\\"/g, '').replace(/"/g, ''),
					loading: false
				});
			});
	}

	useEffect(() => {
		if (storage.questions === undefined && storage.showSurvey) {
			getSurveyQuestions();
		}
	}, [storage.showSurvey]);

	return (
		<>
			{
				storage.questions !== undefined
					? storage.questions.split(',').map(val =>
						<th scope="col" key={uuidv4()}>{val}</th>
					)
					: <></>
			}
		</>
	);
}

export default GetSurveyQuestions;