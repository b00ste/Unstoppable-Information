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

function GetTitles({ storage, setStorage, surveysContract }) {
	
	const getSurveys = async () => {
    setStorage({
      ...storage,
      loading: true 
    });
		const newBytes32Titles = await surveysContract.methods.getStringToBytes32ArrayStorrage('surveys').call();
		const newStringTitles = [];
		newBytes32Titles.forEach(title => {
			newStringTitles.push(storage.utils.hexToUtf8(title));
		});
    setStorage({
			...storage,
			allSurevyTitles: newStringTitles,
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
							<Survey key={uuidv4()} className="card-default">
									<h4>{val}</h4>
									<button
										type="button"
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
							</Survey>
						)
					: <></>
			}
		</>
	);
}

export default GetTitles;