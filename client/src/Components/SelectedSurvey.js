import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Survey = styled.div`
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);

	background-color: white;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	max-height: 40rem;
	max-width: 50rem;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	border: 0px;

	svg {
		position: absolute;
		top: 0;
		right: 0;
		margin: 0.6rem 1rem;
		color: #fff;
	}
	svg:hover {
		color: rgb(170, 170, 170) !important;
		cursor: pointer;
	}
	div {
		text-align: center;
	}
	.card-header {
		background-color: #1a1a1a;
		width: 100%;
		padding-left: 5em;
		padding-right: 5em;
		h1 {
			margin-bottom: 0px;
			color: #fff;
		}
	}
	.card-body {
		overflow: auto;
	}
	.progress {
		width: 100%;
	}
	.progress-bar {
		width: 100%;
	}
}
`;

const SurveyMask = styled.div`
	position: fixed;
	background-color: rgba(0,0,0,0.5);
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
`;

function SelectedSurvey({ showSurvey, selectedSurvey, loading, body, exit }) {

	let loadingBar = <></>
	if (loading && selectedSurvey !== undefined) {
		loadingBar =
			<div className="progress">
				<div className="progress-bar progress-bar-striped progress-bar-animated"></div>
			</div>
	}

	let survey;
	let surveyMask;
	if (showSurvey) {
		survey =
			<Survey className="card border-light mb-3">
				<FontAwesomeIcon
					icon="times"
					size="3x"
					onClick={exit}
				/>
				<div className="card-header"><h1>{selectedSurvey}</h1></div>
				{loadingBar}
				<div className="card-body">{body}</div>
			</Survey>
		surveyMask = <SurveyMask></SurveyMask>
	}

	return (
		<>
			{surveyMask}
			{survey}
		</>
	);
}

export default SelectedSurvey;