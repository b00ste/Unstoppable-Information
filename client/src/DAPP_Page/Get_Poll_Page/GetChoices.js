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
							<React.Fragment key={uuidv4()}>
								<p>{val}</p>
								<input type="checkbox" name={val} placeholder="Your Answer" onChange={updateAnswers} />
							</React.Fragment>
						)
					: <></>
			}
		</>
	);
}

export default GetChoices;