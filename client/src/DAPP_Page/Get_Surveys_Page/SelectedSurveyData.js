import React from 'react';
import Questions from './GetQuestions';
import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider);

function Data({ storage, setStorage, surveysContract }) {

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
		let bytes32Answers = [];
		storage.questions.forEach(question => {
			const stringAnswer = newAnswers[question];
			console.log(stringAnswer);
			const bytes32Answer = web3.utils.asciiToHex(stringAnswer);
			console.log(bytes32Answer);
			bytes32Answers.push(bytes32Answer);
		});
		console.log(bytes32Answers);
		await surveysContract.methods.surveyParticipation(web3.utils.asciiToHex(storage.selectedSurvey), bytes32Answers).send({ from: storage.userAddress })
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
				surveysContract={surveysContract}
			/>
			<button type="button" className="btn btn-primary" onClick={sendAnswer}>Submit</button>
		</>
	);
}

export default Data;