import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function GetQuestions({ storage, setStorage, updateAnswers, surveysContract }) {

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
			loading: false,
			questions: newStringQuestions
		});
	}

	useEffect(() => {
		if (storage.questions === undefined && storage.showSurvey && storage.selectedSurvey !== undefined && storage.userAddress !== undefined) {
			getSurveyQuestions();
		}
	}, []);

	return (
		<>

			{
				storage.questions !== undefined ?
					storage.questions
						.map((val) =>
							<React.Fragment key={uuidv4()}>
								<p>{val}</p>
								<input type="text" name={val} placeholder="Your Answer" onChange={updateAnswers} />
							</React.Fragment>
						)
					: <></>
			}
		</>
	);
}

export default GetQuestions;