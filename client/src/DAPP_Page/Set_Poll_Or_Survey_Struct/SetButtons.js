import React, { useEffect } from 'react';

function SetButtons({
	storage,
	setStorage,
	approve,
	sendToBC,
	tokenContract,
	surveysAddress,
	pollAddress,
	is
}) {

	const isOperator = async () => {
    if(is === "survey"){
			let newSurveyContractApproved = await tokenContract.methods.isOperatorFor(surveysAddress, storage.userAddress).call();
			setStorage({
				...storage,
				surveyContractApproved: newSurveyContractApproved
			});
    }
    else if(is === "poll"){
			let newPollContractApproved = await tokenContract.methods.isOperatorFor(pollAddress, storage.userAddress).call();
			setStorage({
				...storage,
				pollContractApproved: newPollContractApproved
			});
    }
	}

	useEffect(() => {
		if (
			(
				(storage.surveyContractApproved === undefined && is === "survey")
				||
				(storage.pollContractApproved === undefined && is === "poll")
			)
			&&
			storage.userAddress !== undefined
		) {
			isOperator();
		}
	})

	let approveButton;
	if (
		(!storage.surveyContractApproved && is === "survey")
		||
		(!storage.pollContractApproved && is === "poll")
	) {
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
			<button type="button" className="btn btn-primary" onClick={sendToBC}>
				Let's go
			</button>
		</>
	);
}

export default SetButtons;