import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function GetChoices({ storage, setStorage, updateAnswers, pollContract }) {

	const getSurveyChoices = async () => {
		setStorage({
			...storage,
			loading: true 
		});
		let newChoices = await pollContract.methods.getPollChoices(storage.selectedPoll).call({ from: storage.userAddress });
		setStorage({
			...storage,
			loading: false,
			choices: newChoices.replace(/\\"/g, '').replace(/"/g, '')
		});
	}

	useEffect(() => {
		if (storage.choices === undefined && storage.showPoll && storage.selectedPoll !== undefined) {
			getSurveyChoices();
		}
	}, []);

	return (
		<>

			{
				storage.choices !== undefined ?
					storage.choices.split(',')
						.map((val) =>
							<div key={uuidv4()} onChange={updateAnswers}>
								<p>{val} <input type="radio" name={storage.selectedPoll} value={val}/> </p>
							</div>
						)
					: <></>
			}
		</>
	);
}

export default GetChoices;