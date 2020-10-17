import React, { useEffect } from 'react';

function SetButtons({
	storage,
	setStorage,
	approve,
	sendToBC,
	tokenContract,
	surveysAddress
}) {

	const isOperator = async () => {
		let newSurveyContractApproved = await tokenContract.methods.isOperatorFor(surveysAddress, storage.userAddress).call();
		setStorage({
			...storage,
			surveyContractApproved: newSurveyContractApproved
		});
	}

	useEffect(() => {
		if (storage.surveyContractApproved === undefined && storage.userAddress !== undefined) {
			isOperator();
		}
	})

	let approveButton;
	if (!storage.surveyContractApproved) {
		approveButton =
			<button type="button" onClick={approve}>
				Approve
			</button>
	}
	else {
		approveButton = <></>
	}

	return (
		<>
			{approveButton}
			<button type="button" onClick={sendToBC}>
				Let's go
			</button>
		</>
	);
}

export default SetButtons;