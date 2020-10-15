import React from 'react';
import Questions from './GetChoices';

function Data({ storage, setStorage, pollContract }) {

	let choice;
	const updateAnswers = (event) => {
		event.stopPropagation();
		choice = event.target.value;
	}

	const sendAnswer = async (event) => {
		event.preventDefault();
		setStorage({
			...storage,
			loading: true,
		});
		const escaped = ('' + choice.replace(/"/g, '\\"'));
		const escapedChoice = ('' + `"${escaped}"`);
		console.log(escapedChoice);
		pollContract.methods.pollParticipation(storage.selectedPoll, escapedChoice).send({ from: storage.userAddress })
			.then(() =>
				setStorage({
					...storage,
					choice: undefined,
					showPoll: false,
					selectedPoll: undefined,
					choices: undefined,
					loading: false
				})
			);
	}

	return (
		<>
			<Questions
				storage={storage}
				setStorage={setStorage}
				updateAnswers={updateAnswers}
				pollContract={pollContract}
			/>
			<button onClick={sendAnswer}>Submit</button>
		</>
	);
}

export default Data;