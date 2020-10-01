import React from 'react';
import SelectedSurvey from '../Components/SelectedSurvey';
import UserSurveys from './Get_Account_Surveys';
import Data from './Selected_Survey_Data';
import ExportDataButton from './Export_Data_Button';

function Body(props) {
	return (
		<>
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
				loading={props.loading}
				body={
					<>
						<Data
							surveyAnswers={props.surveyAnswers}
							setSurveyAnswers={props.setSurveyAnswers}
							surveyQuestions={props.surveyQuestions}
							setSurveyQuestions={props.setSurveyQuestions}
							selectedSurvey={props.selectedSurvey}
							showSurvey={props.showSurvey}

							surveysContract={props.surveysContract}
							userAddress={props.userAddress}
							setLoading={props.setLoading}
						/>
						<ExportDataButton
							surveyAnswers={props.surveyAnswers}
							surveyQuestions={props.surveyQuestions}
							selectedSurvey={props.selectedSurvey}
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