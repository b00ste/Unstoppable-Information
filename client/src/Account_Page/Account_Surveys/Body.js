import React from 'react';
import SelectedSurvey from '../../Components/SelectedSurvey/PollWindow.js';
import Surveys from './GetSurveys.js';
import Data from './SelectedSurveyData.js';
import Buttons from '../ExportDataButton.js';


function Body({ storage, setStorage, surveysContract }) {
	
	return (
		<>
			<Surveys
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
						<Buttons
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