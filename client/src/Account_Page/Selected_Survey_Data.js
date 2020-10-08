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

function Data({ storage, setStorage, surveysContract }) {
	return (
		<Table className="table table-hover">
			<thead>
				<tr>
					<SurveyQuestions
						storage={storage}
						setStorage={setStorage}
						surveysContract={surveysContract}
					/>
				</tr>
			</thead>
			<tbody>
				<SurveyAnswers
					storage={storage}
					setStorage={setStorage}
					surveysContract={surveysContract}
				/>
			</tbody>
		</Table>
	);
}

export default Data;