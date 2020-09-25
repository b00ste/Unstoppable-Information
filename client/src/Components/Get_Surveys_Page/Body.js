import React, { useEffect } from 'react'
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import SelectedSurvey from '../SelectedSurvey';
import Surveys from './Get_Surveys';
import SelectedSurveyData from './Show_Selected_Survey';

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
		let newSurveyQuestions = {};
		let totalSurveys = await props.surveysContract.methods.getUintStorage('totalSurveys').call();
		for (var i = 0; i < totalSurveys; i++) {
			let name = await props.surveysContract.methods.getSurveyName(i).call();
			let questions = await props.surveysContract.methods.getSurveyQuestions(name).call();
			newSurveyTitles.push(name);
			newSurveyQuestions[name] = questions.split(",");
		}
		props.setSurveyTitles(newSurveyTitles);
		props.setSurveyQuestions(newSurveyQuestions);
	}

	useEffect(() => {
		if (props.surveyTitles.length === 0)
			getSurveys().then(() => props.setLoading(false));
	});

	return (
		<Container>
			{
				props.surveyTitles.map((val) =>
					<Surveys
						key={uuidv4()}
						title={val}
						question={props.surveyQuestions[val]}
						setSurveyTitles={props.setSurveyTitles}
						setSurveyQuestions={props.setSurveyQuestions}
						setShowSurvey={props.setShowSurvey}
						setSelectedSurvey={props.setSelectedSurvey}
					/>
				)
			}
			<SelectedSurvey
				showSurvey={props.showSurvey}
				setShowSurvey={props.setShowSurvey}
				selectedSurvey={props.selectedSurvey}
				setSelectedSurvey={props.setSelectedSurvey}
				body=
				{
					<SelectedSurveyData
						selectedSurvey={props.selectedSurvey}
						setShowSurvey={props.setShowSurvey}
						setSelectedSurvey={props.setSelectedSurvey}
						surveyQuestions={props.surveyQuestions}
						surveysContract={props.surveysContract}
            userAddress={props.userAddress}
					/>
				}
			/>
		</Container>
	);
}

export default Body;