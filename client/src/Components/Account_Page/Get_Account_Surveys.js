import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-end;
	padding: 1.5em;
	word-wrap: break-word;
	div {
		width: 20rem;
		word-wrap: break-word;
		text-align: center;
		margin: 5rem 2.5rem 2.5rem 2.5rem;
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
		const newUserSurveys = [];
		for (let i = newNumberOfUserSurveys - 1; i >= 0; i--) {
			newUserSurveys.push(await props.surveysContract.methods.getUserSurveyOfNumber(i).call({ from: props.userAddress }));
		}
		props.setUserSurveys(newUserSurveys);
	}

	useEffect(() => {
		if (props.nrOfUserSurveys === undefined)
			getUserSurveys();
	});

	return (
		<>
			<Container>
				<h2>You have created {props.nrOfUserSurveys} surveys.</h2>
			</Container>
			<Container>
				{
					props.userSurveys !== undefined
						? props.userSurveys
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