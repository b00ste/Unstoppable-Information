import React from 'react'
import styled from 'styled-components';
import SelectedSurvey from '../../Components/SelectedSurevyOrPollWindow.js';
import SelectedSurveyData from './SelectedSurveyData.js';
import Titles from './GetTitles.js';

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-end;
`;

function Body({ storage, setStorage, surveysContract }) {
	return (
		<>
			<Container>
				<Titles
					storage={storage}
					setStorage={setStorage}
					surveysContract={surveysContract}
				/>
				<SelectedSurvey
					loading={storage.loading}
					showSurvey={storage.showSurvey}
					selectedSurvey={storage.selectedSurvey}
					body=
					{
						<SelectedSurveyData
							storage={storage}
							setStorage={setStorage}
							surveysContract={surveysContract}
						/>
					}
					exit=
					{
						() => {
							setStorage({
								...storage,
								showSurvey: false,
								selectedSurvey: undefined,
								questions: undefined,
								answers: undefined
							});
						}
					}
				/>
			</Container>
		</>
	);
}

export default Body;