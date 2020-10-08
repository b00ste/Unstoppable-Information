import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-end;
	word-wrap: break-word;
	h2 {
		padding: 1em 0 0em 0;
	}
	div {
		width: 20rem;
		word-wrap: break-word;
		text-align: center;
		margin: 2rem;
		h4 {
			margin: 1em 1em 0.5em 1em;
		}
		button {
			margin: 0.5em 1em 1em 1em;
		}
	}
`;

function GetUserSurveys({ storage, setStorage, surveysContract }) {

	const getUserSurveys = async () => {
		setStorage({
			...storage,
			loading: true
		});
		const newNrOfUserSurveys = await surveysContract.methods.getUserCreatedSurveys().call({ from: storage.userAddress });
		const newTitles = [];
		for (let i = newNrOfUserSurveys - 1; i >= 0; i--) {
			newTitles.push(await surveysContract.methods.getUserNumberOfSurveys(i).call({ from: storage.userAddress }));
		}
		setStorage({
			...storage,
			nrOfUserSurveys: newNrOfUserSurveys,
			userSurveyTitles: newTitles,
			loading: false
		});
	}

	useEffect(() => {
		if (storage.nrOfUserSurveys === undefined && storage.userSurveyTitles === undefined) {
			getUserSurveys();
		}
	}, [storage.userAddress]);

	return (
		<>
			<Container>
				<h2>You have created {storage.nrOfUserSurveys} surveys.</h2>
			</Container>
			<Container>
				{
					storage.userSurveyTitles !== undefined
						? storage.userSurveyTitles
							.filter(val => val.includes(storage.searchVal))
							.map(val =>
								<div key={uuidv4()} className="card text-white bg-primary mb-3">
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
										Show details
									</button>
								</div>
							)
						: <></>
				}
			</Container>
		</>
	);
}

export default GetUserSurveys;