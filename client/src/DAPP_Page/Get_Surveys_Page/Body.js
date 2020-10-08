import React from 'react'
import styled from 'styled-components';
import SelectedSurvey from '../../Components/SelectedSurvey.js';
import SelectedSurveyData from './SelectedSurveyData.js';
import Titles from './GetTitles.js';

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-end;
`;

function Body({ storage, setStorage }) {
	return (
		<>
			<Container>
				<Titles
					storage={storage}
					setStorage={setStorage}
				/>
				<SelectedSurvey
					showSurvey={storage.showSurvey}
					selectedSurvey={storage.selectedSurvey}
					loading={storage.loading}
					body=
					{
						<SelectedSurveyData
							storage={storage}
							setStorage={setStorage}
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