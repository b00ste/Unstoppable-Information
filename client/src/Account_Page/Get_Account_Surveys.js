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

function GetUserSurveys(props) {

	const getUserSurveys = async () => {
		const newNumberOfUserSurveys = await props.surveysContract.methods.getUserCreatedSurveys().call({ from: props.userAddress });
		props.setNrOfUserSurveys(newNumberOfUserSurveys);
		const newSurveyTitles = [];
		for (let i = newNumberOfUserSurveys - 1; i >= 0; i--) {
			newSurveyTitles.push(await props.surveysContract.methods.getUserNumberOfSurveys(i).call({ from: props.userAddress }));
		}
		props.setSurveyTitles(newSurveyTitles);
	}

	useEffect(() => {
		if (props.nrOfUserSurveys === undefined) {
			getUserSurveys();
		}
	});

	return (
		<>
			<Container>
				<h2>You have created {props.nrOfUserSurveys} surveys.</h2>
			</Container>
			<Container>
				{
					props.surveyTitles !== undefined
						? props.surveyTitles
							.filter(val => val.includes(props.searchVal))
							.map(val =>
								<div key={uuidv4()} className="card text-white bg-primary mb-3">
									<h4 className="card-title">{val}</h4>
									<button
										type="button"
										className="btn btn-secondary"
										onClick={() => {
											props.setShowSurvey(true);
											props.setSelectedSurvey(val);
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