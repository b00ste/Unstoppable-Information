import React, { useEffect } from 'react';

function GetNrOfVotes({ name, storage, setStorage, pollContract }) {

	const getNrOfVotes = async () => {
		setStorage({
			...storage,
			loading: true
		});
		let nrOfVotes = await pollContract.methods.getPollChoiceVotes(storage.selectedPoll, name).call({ from: storage.userAddress });
		setStorage({
			...storage,
			votes: {
				[name]: nrOfVotes
			},
			loading: false
		});
	}

	useEffect(() => {
		if (storage.votes === undefined && storage.showPoll) {
			getNrOfVotes();
		}
	});

	return (
		<>
			{storage.votes !== undefined ? storage.votes[name] : ''}
		</>
	);
}

export default GetNrOfVotes;