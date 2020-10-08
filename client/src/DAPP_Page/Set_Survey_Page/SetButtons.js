import React, { useEffect } from 'react';

function SetButtons({ storage, setStorage, approve, setNewSurvey }) {

	const isOperator = async () => {
		let newSurveyContractApproved = await storage.tokenContract.methods.isOperatorFor(storage.surveysAddress, storage.userAddress).call();
		setStorage({
			...storage,
			surveyContractApproved: newSurveyContractApproved
		});
	}

	useEffect(() => {
		if(storage.surveyContractApproved === undefined && storage.userAddress !== undefined ) {
			isOperator();
		}
	})

	let approveButton;
	if (!storage.surveyContractApproved) {
		approveButton =
			<button type="button" className="btn btn-primary" onClick={approve}>
				Approve
			</button>
	}
	else {
		approveButton = <></>
	}

	return (
		<>
			{approveButton}
			<button type="button" className="btn btn-primary" onClick={setNewSurvey}>
				Let's go
			</button>
		</>
	);
}

export default SetButtons;