import React, { useEffect } from 'react';

function GetChoiceVotes({ storage, setStorage, pollContract }) {
	const getChoiceVotes = async () => {
		setStorage({
			...storage,
			loading: true
		});
		let newVotes = {};
		storage.choices.forEach(async choice => {
			const nrOfVotes = await pollContract.methods.getPollBytes32UintStorage(storage.utils.asciiToHex(storage.selectedPoll), storage.utils.asciiToHex(choice)).call();
			newVotes[choice] = nrOfVotes;
		});
		console.log(newVotes);
		setStorage({
			...storage,
			loading: false,
			votes: newVotes
		});
	}

	useEffect(() => {
		if(storage.choices !== undefined && storage.votes === undefined) {
			getChoiceVotes();
		}
	}, []);

	return (
		<> </>
	);
}

export default GetChoiceVotes;