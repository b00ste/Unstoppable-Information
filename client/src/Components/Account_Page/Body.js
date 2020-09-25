import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import SelectedSurvey from '../SelectedSurvey';
import Balance from './Get_Balance';
import UserSurveys from './Get_Account_Surveys';
import SurveyQuestions from './Get_Survey_Questions';
import SurveyAnswers from './Get_Survey_Answers';

function Body(props) {
	return (
		<>
			<Balance
				balance={props.balance}
				setBalance={props.setBalance}

				surveysContract={props.surveysContract}
				userAddress={props.userAddress}
			/>
			<UserSurveys
				nrOfUserSurveys={props.nrOfUserSurveys}
				setNrOfUserSurveys={props.setNrOfUserSurveys}
				userSurveys={props.userSurveys}
				setUserSurveys={props.setUserSurveys}

				surveysContract={props.surveysContract}
				userAddress={props.userAddress}
			/>
			<p>{props.nrOfUserSurveys}</p>
			{ props.userSurveys !== undefined ? props.userSurveys.map(val => <p key={uuidv4()} onClick={() => { props.setShowSurvey(true); props.setSelectedSurvey(val); }}>{val}</p>) : <></>}
			<p>{props.balance !== undefined ? props.balance : <></>}</p>
			<SelectedSurvey
				showSurvey={props.showSurvey}
				setShowSurvey={props.setShowSurvey}
				selectedSurvey={props.selectedSurvey}
				setSelectedSurvey={props.setSelectedSurvey}
				body={
					<>
						<p>some text</p>
						<SurveyQuestions
							userSurveyQuestions={props.userSurveyQuestions}
							setUserSurveyQuestions={props.setUserSurveyQuestions}
							selectedSurvey={props.selectedSurvey}
							showSurvey={props.showSurvey}

							surveysContract={props.surveysContract}
							userAddress={props.userAddress}
						/>
						<SurveyAnswers
							userSurveyAnswers={props.userSurveyAnswers}
							setUserSurveyAnswers={props.setUserSurveyAnswers}
							selectedSurvey={props.selectedSurvey}
							showSurvey={props.showSurvey}

							surveysContract={props.surveysContract}
							userAddress={props.userAddress}
						/>
					</>
				}
			/>
		</>
	);
}

export default Body;