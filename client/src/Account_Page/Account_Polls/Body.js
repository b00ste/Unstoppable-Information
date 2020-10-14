import React from 'react';
import SelectedPoll from '../../Components/SelectedSurevyOrPollWindow.js';
import Surveys from './GetPolls.js';
import Data from './SelectedPollData.js';
import Buttons from '../ExportDataButton.js';


function Body({ storage, setStorage, pollContract }) {
	
	return (
		<>
			<Surveys
				storage={storage}
				setStorage={setStorage}
				pollContract={pollContract}
			/>
			<SelectedPoll
				showPoll={storage.showPoll}
				selectedPoll={storage.selectedPoll}
				loading={storage.loading}
				body={
					<>
						<Data
							storage={storage}
							setStorage={setStorage}
							pollContract={pollContract}
						/>
						<Buttons
							answers={storage.answers}
							questions={storage.questions}
							selectedPoll={storage.selectedPoll}
						/>
					</>
				}
				exit=
				{
					() => {
						setStorage({
							...storage,
							showPoll: false,
							selectedPoll: undefined,
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