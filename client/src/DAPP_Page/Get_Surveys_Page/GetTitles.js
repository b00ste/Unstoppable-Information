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
		margin 5px;
		width: 15rem;
}
`;

function GetTitles({ storage, setStorage, surveysContract }) {
	
	const getSurveys = async () => {
    setStorage({
      ...storage,
      loading: true 
    });
		let newTitles = [];
		let totalSurveys = await surveysContract.methods.getUintStorage('totalSurveys').call();
		for (var i = totalSurveys - 1; i >= 0; i--) {
			let name = await surveysContract.methods.getSurveyName(i).call();
			newTitles.push(name);
		}
    setStorage({
			...storage,
			allSurevyTitles: newTitles,
      loading: false 
    });
	}

	useEffect(() => {
		if (storage.allSurevyTitles === undefined)
			getSurveys();
	}, [storage.userAddress]);

	return (
		<>
			{
				storage.allSurevyTitles !== undefined
					? storage.allSurevyTitles
						.filter(val => val.includes(storage.searchVal))
						.map((val) =>
							<Survey key={uuidv4()} className="card text-white bg-primary mb-3">
								<div className="card-body">
									<h4 className="card-title">{val}</h4>
									<button
										type="button"
										className="btn btn-secondary"
										onClick={() => {
											setStorage({
												...storage,
												showSurvey: true,
												selectedSurvey: val
											});
										}}
									>
										Participate
								</button>
								</div>
							</Survey>
						)
					: <></>
			}
		</>
	);
}

export default GetTitles;