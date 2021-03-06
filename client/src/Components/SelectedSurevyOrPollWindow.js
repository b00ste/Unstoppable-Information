import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Survey = styled.div`
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);

	background-color: #3EECAC;
	background-image: linear-gradient(19deg, #3EECAC 0%, #EE74E1 100%);

	box-shadow: 1px 5px 7px 0px rgba(0, 0, 0, 0.3), 1px 3px 5px 0px rgba(0, 0, 0, 0.15);
	width: 23em;

	text-align: center;
	.clickable:hover {
		color: #3e005c;
		cursor: pointer;
	}
`;
const Title = styled.div`
	width: 100%;
	border-bottom: 1px solid black;
	margin: 0;
	box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5), 0 0 4px 0 rgba(0, 0, 0, 0.4);
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	P {
		font-size: 1.75em;
		padding: 0 2em;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	svg {
		position: fixed;
		top: 0;
		right: 0;
		margin: 1.5rem 0.5rem;
		color: #1a1a1a;
	}
`;
const Body = styled.div`
	margin-top: 6em;
	max-height: 30em;
	overflow-y: scroll;
	-ms-overflow-style: none;
	scrollbar-width: none;
	&::-webkit-scrollbar {
		display: none;
	}
	p {
		font-size: 1.4em;
		margin: 0.5em 0 0 0;
	}
	input[type="text"] {
		display: inline;
		width: 70%;
		margin: 0.6em 0;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.175);
	}
	input[type="checkbox"] {
		box-shadow: 0 0 black !important;
	}
	button {
		display: inline-block;
		width: 50%;
		margin: 1em 0;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.175);
		background-color: #1a1a1a;
		color: #fdfcfa;
		&:hover {
			background-color: #B3315F;
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

function SelectedSurvey({ loading, showSurvey, selectedSurvey, showPoll, selectedPoll, body, exit}) {

	let loadingBar = <></>
	if (loading && (selectedSurvey !== undefined || selectedPoll !== undefined)) {
		loadingBar =
			<div className="progress" style={{ width: "100%" }}>
				<div className="progress-bar progress-bar-striped progress-bar-animated"></div>
			</div>
	}

	let survey;
	let surveyMask;
	if (showSurvey || showPoll) {
		survey =
			<Survey>
				<Title className="title" id="title">
					<FontAwesomeIcon
						className="clickable"
						icon="times"
						size="3x"
						onClick={exit}
					/>
					<p>{showSurvey ? selectedSurvey : showPoll ? selectedPoll : ''}</p>
				</Title>
				<Body className="body">
					{loadingBar}
					{body}
				</Body>
			</Survey>
		surveyMask = <SurveyMask onClick={exit}></SurveyMask>
	}

	return (
		<>
			{surveyMask}
			{survey}
		</>
	);
}

export default SelectedSurvey;