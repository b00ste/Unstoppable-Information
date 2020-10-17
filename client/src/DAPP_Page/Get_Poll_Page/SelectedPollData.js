import React from 'react';
import Choices from './GetChoices';

function Data({ storage, setStorage, pollContract }) {

	const sendAnswer = async (event) => {
		event.preventDefault();
		setStorage({
			...storage,
			loading: true,
		});
		pollContract.methods.pollParticipation(storage.utils.asciiToHex(storage.selectedPoll), storage.utils.asciiToHex(storage.choice)).send({ from: storage.userAddress })
			.then(() =>
				setStorage({
					...storage,
					showPoll: false,
					selectedPoll: undefined,
					choices: undefined,
					choice: undefined,
					loading: false
				})
			);
	}

	return (
		<>
			<Choices
				storage={storage}
				setStorage={setStorage}
				pollContract={pollContract}
			/>
			<button type="button" onClick={sendAnswer}>Submit</button>
		</>
	);
}

export default Data;