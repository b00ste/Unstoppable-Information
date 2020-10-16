import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider);

function GetQuestions({ storage, setStorage, updateAnswers, surveysContract }) {

	const getSurveyQuestions = async () => {
		setStorage({
			...storage,
			loading: true
		});
		const newBytes32Questions = await surveysContract.methods.getSurveyStringToBytes32ArrayStorage(web3.utils.asciiToHex(storage.selectedSurvey), 'questions').call();
		const newStringQuestions = [];
		newBytes32Questions.forEach(question => {
			newStringQuestions.push(web3.utils.hexToUtf8(question));
		});
		setStorage({
			...storage,
			loading: false,
			questions: newStringQuestions
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