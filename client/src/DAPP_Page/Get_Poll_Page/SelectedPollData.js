import React from 'react';
import Questions from './GetChoices';

function Data({ storage, setStorage, pollContract }) {

	let newAnswers = {};
	const updateAnswers = (event) => {
		event.preventDefault();
		newAnswers[event.target.name] = event.target.value;
	}

	const sendAnswer = async (event) => {
		event.preventDefault();
		setStorage({
			...storage,
			loading: true,
		});
		let questions = storage.questions.split(',');
		let answer = [];
		for (var i = 0; i < questions.length; i++) {
			const escaped = ('' + newAnswers[questions[i]]).replace(/"/g, '\\"');
			console.log(escaped);
			answer.push(`"${escaped}"`);
		}
		console.log(answer.join());
		await pollContract.methods.pollParticipation(storage.selectedSurvey, answer.join()).send({ from: storage.userAddress })
			.then(() =>
				setStorage({
					...storage,
					answers: undefined,
					showSurvey: false,
					selectedSurvey: undefined,
					questions: undefined,
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
			<button type="button" className="btn btn-primary" onClick={sendAnswer}>Submit</button>
		</>
	);
}

export default Data;