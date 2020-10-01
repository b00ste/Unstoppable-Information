import React, { useEffect } from 'react'
import styled from 'styled-components';
import SelectedSurvey from '../Components/SelectedSurvey';
import SelectedSurveyData from './Selected_Survey_Data';
import SurveyTitles from './Get_Survey_Titles';

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-end;
`;

function Body(props) {

	const getSurveys = async () => {
		props.setLoading(true);
		let newSurveyTitles = [];
		let totalSurveys = await props.surveysContract.methods.getUintStorage('totalSurveys').call();
		for (var i = totalSurveys - 1; i >= 0; i--) {
			let name = await props.surveysContract.methods.getSurveyName(i).call();
			newSurveyTitles.push(name);
		}
		props.setSurveyTitles(newSurveyTitles);
	}

	useEffect(() => {
		if (props.surveyTitles === undefined)
			getSurveys().then(() => props.setLoading(false));
	});

	return (
		<Container>
			<SurveyTitles
				surveyTitles={props.surveyTitles}
				setSurveyTitles={props.setSurveyTitles}
				setShowSurvey={props.setShowSurvey}
				setSelectedSurvey={props.setSelectedSurvey}
				surveysContract={props.surveysContract}
				userAddress={props.userAddress}
				setLoading={props.setLoading}
			/>
			<SelectedSurvey
				showSurvey={props.showSurvey}
				selectedSurvey={props.selectedSurvey}
				loading={props.loading}
				body=
				{
					<SelectedSurveyData
						surveyQuestions={props.surveyQuestions}
						setSurveyQuestions={props.setSurveyQuestions}
						surveyAnswers={props.surveyAnswers}
						setSurveyAnswers={props.setSurveyAnswers}
						showSurvey={props.showSurvey}
						setShowSurvey={props.setShowSurvey}
						selectedSurvey={props.selectedSurvey}
						setSelectedSurvey={props.setSelectedSurvey}
						surveysContract={props.surveysContract}
						userAddress={props.userAddress}
						setLoading={props.setLoading}
					/>
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
		</Container>
	);
}

export default Body;