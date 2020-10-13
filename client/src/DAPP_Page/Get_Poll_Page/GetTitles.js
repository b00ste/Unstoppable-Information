import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

const Survey = styled.div`
	max-width: 20rem;
	word-wrap: break-word;
	margin: 2em;
	text-align: center;
	button {
		display: inline-block;
		margin: 2em !important;
		width: 15rem;
}
`;

function GetTitles({ storage, setStorage, pollContract }) {
	
	const getSurveys = async () => {
    setStorage({
      ...storage,
      loading: true 
    });
		let newTitles = [];
		let totalSurveys = await pollContract.methods.getUintStorage('totalPolls').call();
		for (var i = totalSurveys - 1; i >= 0; i--) {
			let name = await pollContract.methods.getPollName(i).call();
			newTitles.push(name);
		}
    setStorage({
			...storage,
			allPollTitles: newTitles,
      loading: false 
    });
	}

	useEffect(() => {
		if (storage.allPollTitles === undefined)
			getSurveys();
	}, [storage.userAddress]);

	return (
		<>
			{
				storage.allPollTitles !== undefined
					? storage.allPollTitles
						.filter(val => val.includes(storage.searchVal))
						.map((val) =>
							<Survey key={uuidv4()} className="card-default">
									<h4>{val}</h4>
									<button
										onClick={() => {
											setStorage({
												...storage,
												showPoll: true,
												selectedPoll: val
											});
										}}
									>
										Participate
								</button>
							</Survey>
						)
					: <></>
			}
		</>
	);
}

export default GetTitles;