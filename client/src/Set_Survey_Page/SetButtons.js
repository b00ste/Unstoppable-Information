import React from 'react';

function SetButtons(props) {

	const isOperator = async () => {
		return (await props.tokenContract.methods.isOperatorFor(props.surveysAddress, props.userAddress).call());
	}

	return (
		<>
			<button type="button" className="btn btn-primary" onClick={props.approve}>
				Approve
			</button>
			<button type="button" className="btn btn-primary" onClick={props.setNewSurvey}>
				Let's go
			</button>
		</>
	);
}

export default SetButtons;