import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NrOfVotes from './GetNrOfVotes';

function GetPollChoices({ storage, setStorage, pollContract }) {

	const getPollChoices = async () => {
		setStorage({
			...storage,
			loading: true
		});
		pollContract.methods.getPollChoices(storage.selectedPoll).call()
			.then((newChoices) => {
				setStorage({
					...storage,
					choices: newChoices.replace(/\\"/g, '').replace(/"/g, ''),
					loading: false
				});
			});
	}

	useEffect(() => {
		if (storage.choices === undefined && storage.showPoll) {
			getPollChoices();
			console.log(storage.choices);
		}
	});

	return (
		<>
			{
				storage.choices !== undefined
					? storage.choices.split(',').map(val =>
						<p key={uuidv4()}>{val}: <NrOfVotes name={val} storage={storage} setStorage={setStorage} pollContract={pollContract} /></p>
					)
					: ''
			}
		</>
	);
}

export default GetPollChoices;