import React from 'react'
import Questions from './GetQuestions';
import Answers from './GetAnswers';
import styled from 'styled-components';

const Table = styled.table`
	th {
		border: 0px !important;
		border-bottom: 1px solid #1a1a1a !important;
	}
`;

function Data({ storage, setStorage, surveysContract }) {
	return (
		<Table className="table">
			<thead>
				<tr>
					<Questions
						storage={storage}
						setStorage={setStorage}
						surveysContract={surveysContract}
					/>
				</tr>
			</thead>
			<tbody>
				<Answers
					storage={storage}
					setStorage={setStorage}
					surveysContract={surveysContract}
				/>
			</tbody>
		</Table>
	);
}

export default Data;