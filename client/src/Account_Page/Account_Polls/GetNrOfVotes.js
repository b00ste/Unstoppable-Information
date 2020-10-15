import React, { useEffect } from 'react';

function GetNrOfVotes({ storage, setStorage, pollContract }) {

	const getNrOfVotes = async () => {
		setStorage({
			...storage,
			loading: true
		});
		let newVotes = {};
		for (const choice of storage.choices) {
			pollContract.methods.getPollChoiceVotes(storage.selectedPoll, choice).call({ from: storage.userAddress })
				.then(nrOfVotes => {
					console.log(nrOfVotes);
					newVotes[choice] = nrOfVotes;
					setStorage({
						...storage,
						votes: newVotes,
						loading: false
					});
				});
		}
	}

	useEffect(() => {
		if (storage.votes === undefined && storage.showPoll) {
			getNrOfVotes();
		}
	});

	return (<></>);
}

export default GetNrOfVotes;