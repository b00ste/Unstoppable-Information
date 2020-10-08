import React, { useEffect } from 'react'
import styled from 'styled-components';
import SelectedSurvey from '../Components/SelectedSurvey.js';
import SelectedSurveyData from './Selected_Survey_Data.js';
import SurveyTitles from './Get_Survey_Titles.js';

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-end;
`;

function Body({ storage, setStorage, surveysContract, resetState }) {
	useEffect(() => {
		return () => {
			resetState();
		}
	}, [resetState])
	return (
		<>
			<Container>
				<SurveyTitles
					storage={storage}
					setStorage={setStorage}
					surveysContract={surveysContract}
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