import React from 'react'
import SurveyQuestions from './Get_Survey_Questions';
import SurveyAnswers from './Get_Survey_Answers';
import styled from 'styled-components';

const Table = styled.table`
	th {
		border: 0px !important;
		border-bottom: 1px solid #1a1a1a !important;
	}
`;

function Data(props) {
	return (
		<Table className="table table-hover">
			<thead>
				<tr>
					<SurveyQuestions
						surveyQuestions={props.surveyQuestions}
						setSurveyQuestions={props.setSurveyQuestions}
						selectedSurvey={props.selectedSurvey}
						showSurvey={props.showSurvey}

						surveysContract={props.surveysContract}
						userAddress={props.userAddress}
						setLoading={props.setLoading}
					/>
				</tr>
			</thead>
			<tbody>
				<SurveyAnswers
					surveyAnswers={props.surveyAnswers}
					setSurveyAnswers={props.setSurveyAnswers}
					selectedSurvey={props.selectedSurvey}
					showSurvey={props.showSurvey}

					surveysContract={props.surveysContract}
					userAddress={props.userAddress}
					setLoading={props.setLoading}
				/>
			</tbody>
		</Table>
	);
}

export default Data;