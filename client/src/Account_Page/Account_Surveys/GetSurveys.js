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
		color: #fff;
	}
	div {
		width: 20rem;
		word-wrap: break-word;
		text-align: center;
		margin: 2rem;
		h4 {
			margin: 2em 1em 0.5em 1em;
		}
		button {
			margin: 2em 1em 1em 1em;
		}
	}
`;

function GetUserSurveys({ storage, setStorage, surveysContract }) {

	const getUserSurveys = async () => {
		setStorage({
			...storage,
			loading: true
		});
		const newBytes32Titles = await surveysContract.methods.getUserStringToBytes32ArrayStorage('surveys').call({ from: storage.userAddress });
		const newStringTitles = [];
		newBytes32Titles.forEach(title => {
			newStringTitles.push(storage.utils.hexToUtf8(title));
		});
		setStorage({
			...storage,
			nrOfUserSurveys: newStringTitles.length,
			userSurveyTitles: newStringTitles,
			loading: false
		});
	}

	useEffect(() => {
		if (storage.nrOfUserSurveys === undefined && storage.userSurveyTitles === undefined && storage.userAddress !== undefined) {
			getUserSurveys();
		}
	}, []);

	return (
		<>
			<Container>
				<h2>
					You have created {storage.nrOfUserSurveys} {storage.nrOfUserPolls !== undefined && (storage.nrOfUserPolls.lenght > 1 || storage.nrOfUserPolls.lenght === 0) ? 'surveys' : 'survey'}.
				</h2>
			</Container>
			<Container>
				{
					storage.userSurveyTitles !== undefined
						? storage.userSurveyTitles
							.filter(val => val.includes(storage.searchVal))
							.map(val =>
								<div key={uuidv4()} className="card-default">
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