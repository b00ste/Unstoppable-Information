import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const Survey = styled.div`
	max-width: 20rem;
	word-wrap: break-word;
	margin: 5rem 2.5rem 2.5rem 2.5rem;
	text-align: center;
	span {
		margin: 15px;
		display: inline-block;
	}
	button {
		display: inline-block;
		margin 5px;
		width: 15rem;
}
`;

function Surveys(props) {
	return (
		<Survey className="card text-white bg-primary mb-3">
			<div className="card-body">
				<h4 className="card-title">{props.title}</h4>
				{props.question !== undefined ? props.question.map(val => <p key={uuidv4()} className="card-text">{val}</p>) : <></>}
				<button
					type="button"
					className="btn btn-secondary"
					onClick={() => {
						props.setShowSurvey(true);
						props.setSelectedSurvey(props.title);
					}}
				>
					Participate
</button>
			</div>
		</Survey>
	);
}

export default Surveys;