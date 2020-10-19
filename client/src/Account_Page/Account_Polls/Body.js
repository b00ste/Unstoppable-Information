import React from 'react';
import SelectedPoll from '../../Components/SelectedSurevyOrPollWindow.js';
import Surveys from './GetPolls.js';
import Choices from './GetChoices';
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
						<Choices
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
							choices: undefined,
							votes: undefined
						});
					}
				}
			/>
		</>
	);
}

export default Body;