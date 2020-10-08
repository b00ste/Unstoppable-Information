import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

const Input = styled.input`
	width: 25em;
	display: inline-block;
	margin-top: 2px;
	margin-bottom: 15px;
`;

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
								<h4 className="card-title">{val}</h4>
								<Input type="text" className="form-control" name={val} placeholder="Your Answer" onChange={updateAnswers} />
							</React.Fragment>
						)
					: <></>
			}
		</>
	);
}

export default GetQuestions;