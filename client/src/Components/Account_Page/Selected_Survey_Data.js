import React from 'react'
import SurveyQuestions from './Get_Survey_Questions';
import SurveyAnswers from './Get_Survey_Answers';

function Data(props) {
	return (
		<table className="table table-hover">
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
		</table>
	);
}

export default Data;