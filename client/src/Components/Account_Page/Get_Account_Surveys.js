import React, { useEffect } from 'react';

function GetUserSurveys(props) {

	const getUserSurveys = async () => {
		const newNumberOfUserSurveys = await props.surveysContract.methods.getUserCreatedSurveys().call({ from: props.userAddress });
		props.setNrOfUserSurveys(newNumberOfUserSurveys);
		const newUserSurveys = [];
		for (let i = 0; i < newNumberOfUserSurveys; i++) {
			newUserSurveys.push(await props.surveysContract.methods.getUserSurveyOfNumber(i).call({ from: props.userAddress }));
		}
		props.setUserSurveys(newUserSurveys);
	}

	useEffect(() => {
		if (props.nrOfUserSurveys === undefined)
			getUserSurveys();
	});

	return(
		<></>
	);
}

export default GetUserSurveys;