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

function GetSurveyTitles(props) {

	const getSurveys = async () => {
		props.setLoading(true);
		let newSurveyTitles = [];
		let totalSurveys = await props.surveysContract.methods.getUintStorage('totalSurveys').call();
		for (var i = totalSurveys - 1; i >= 0; i--) {
			let name = await props.surveysContract.methods.getSurveyName(i).call();
			newSurveyTitles.push(name);
		}
		props.setSurveyTitles(newSurveyTitles);
	}

	useEffect(() => {
		if (props.surveyTitles === undefined)
			getSurveys().then(() => props.setLoading(false));
	});

	return (
		<>
			{
				props.surveyTitles !== undefined
					? props.surveyTitles
						.filter(val => val.includes(props.searchVal))
						.map((val) =>
							<Survey key={uuidv4()} className="card text-white bg-primary mb-3">
								<div className="card-body">
									<h4 className="card-title">{val}</h4>
									<button
										type="button"
										className="btn btn-secondary"
										onClick={() => {
											props.setShowSurvey(true);
											props.setSelectedSurvey(val);
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

export default GetSurveyTitles;