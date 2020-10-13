import React, { useEffect } from 'react';

function SetButtons({
	storage,
	setStorage,
	approve,
	setNewPoll,
	tokenContract,
	pollAddress
}) {

	const isOperator = async () => {
		let newPollContractApproved = await tokenContract.methods.isOperatorFor(pollAddress, storage.userAddress).call();
		setStorage({
			...storage,
			pollContractApproved: newPollContractApproved
		});
	}

	useEffect(() => {
		if (storage.pollContractApproved === undefined && storage.userAddress !== undefined) {
			isOperator();
		}
	})

	let approveButton;
	if (!storage.pollContractApproved) {
		approveButton =
			<button onClick={approve}>
				Approve
			</button>
	}
	else {
		approveButton = <></>
	}

	return (
		<>
			{approveButton}
			<button onClick={setNewPoll}>
				Let's go
			</button>
		</>
	);
}

export default SetButtons;