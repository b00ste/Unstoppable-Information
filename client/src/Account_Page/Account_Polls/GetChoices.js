import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ChoiceVotes from './GetChoiceVotes.js';

function GetPollChoices({ storage, setStorage, pollContract }) {

	const getPollChoices = async () => {
		setStorage({
			...storage,
			loading: true
		});
		const newBytes32Choices = await pollContract.methods.getPollStringToBytes32ArrayStorage(storage.utils.asciiToHex(storage.selectedPoll), 'choices').call();
		const newStringChoices = [];
		newBytes32Choices.forEach(async choice => {
			newStringChoices.push(storage.utils.hexToUtf8(choice));
		});
		setStorage({
			...storage,
			choices: newStringChoices,
			loading: false
		});
		if(storage.choices !== undefined) storage.choices.map(val => console.log(val));
	}

	useEffect(() => {
		if (storage.choices === undefined && storage.showPoll) {
			getPollChoices();
		}
	});

	return (
		<>
			<ChoiceVotes storage={storage} setStorage={setStorage} pollContract={pollContract} />
			{
				storage.choices !== undefined
					? storage.choices.map(val =>
					<p key={uuidv4()}>{val}: {storage.votes !== undefined ? storage.votes[val] : ''}</p>
					)
					: ''
			}
		</>
	);
}

export default GetPollChoices;