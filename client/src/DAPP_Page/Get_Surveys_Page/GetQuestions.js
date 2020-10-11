import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function GetQuestions({ storage, setStorage, updateAnswers, surveysContract }) {

	const getSurveyQuestions = async () => {
		setStorage({
			...storage,
			loading: true 
		});
		let newQuestions = await surveysContract.methods.getSurveyQuestions(storage.selectedSurvey).call({ from: storage.userAddress });
		setStorage({
			...storage,
			loading: false,
			questions: newQuestions.replace(/\\"/g, '').replace(/"/g, '')
		});
	}

	useEffect(() => {
		if (storage.questions === undefined && storage.showSurvey && storage.selectedSurvey !== undefined) {
			getSurveyQuestions();
		}
	}, []);

	return (
		<>

			{
				storage.questions !== undefined ?
					storage.questions.split(',')
						.map((val) =>
							<React.Fragment key={uuidv4()}>
								<p>{val}</p>
								<input type="text" className="form-control" name={val} placeholder="Your Answer" onChange={updateAnswers} />
							</React.Fragment>
						)
					: <></>
			}
		</>
	);
}

export default GetQuestions;