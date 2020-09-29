import React from 'react';
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
				setShowSurvey={props.setShowSurvey}
				setSelectedSurvey={props.setSelectedSurvey}

				surveysContract={props.surveysContract}
				userAddress={props.userAddress}
			/>
			<SelectedSurvey
				showSurvey={props.showSurvey}
				selectedSurvey={props.selectedSurvey}
				body={
					<>
						<SurveyQuestions
							surveyQuestions={props.surveyQuestions}
							setSurveyQuestions={props.setSurveyQuestions}
							selectedSurvey={props.selectedSurvey}
							showSurvey={props.showSurvey}

							surveysContract={props.surveysContract}
							userAddress={props.userAddress}
						/>
						<SurveyAnswers
							surveyAnswers={props.surveyAnswers}
							setSurveyAnswers={props.setSurveyAnswers}
							selectedSurvey={props.selectedSurvey}
							showSurvey={props.showSurvey}

							surveysContract={props.surveysContract}
							userAddress={props.userAddress}
						/>
					</>
				}
				exit=
				{
					() => {
						props.setShowSurvey(false);
						props.setSelectedSurvey(undefined);
						props.setSurveyQuestions(undefined);
						props.setSurveyAnswers(undefined);
					}
				}
			/>
		</>
	);
}

export default Body;