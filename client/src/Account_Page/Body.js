import React, { useEffect } from 'react';
import SelectedSurvey from '../Components/SelectedSurvey.js';
import UserSurveys from './Get_Account_Surveys.js';
import Data from './Selected_Survey_Data.js';
import ExportDataButton from './Export_Data_Button.js';


function Body({ storage, setStorage, surveysContract, resetState }) {
	useEffect(() => {
		return () => {
			resetState();
		}
	}, [resetState])
	return (
		<>
			<UserSurveys
				storage={storage}
				setStorage={setStorage}
				surveysContract={surveysContract}
			/>
			<SelectedSurvey
				showSurvey={storage.showSurvey}
				selectedSurvey={storage.selectedSurvey}
				loading={storage.loading}
				body={
					<>
						<Data
							storage={storage}
							setStorage={setStorage}
							surveysContract={surveysContract}
						/>
						<ExportDataButton
							answers={storage.answers}
							questions={storage.questions}
							selectedSurvey={storage.selectedSurvey}
						/>
					</>
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
		</>
	);
}

export default Body;