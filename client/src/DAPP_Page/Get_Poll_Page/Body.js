import React from 'react'
import styled from 'styled-components';
import SelectedPoll from '../../Components/SelectedSurvey/PollWindow.js';
import SelectedPollData from './SelectedPollData.js';
import Titles from './GetTitles.js';

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-end;
`;

function Body({ storage, setStorage, pollContract }) {
	return (
		<>
			<Container>
				<Titles
					storage={storage}
					setStorage={setStorage}
					pollContract={pollContract}
				/>
				<SelectedPoll
					loading={storage.loading}
					showPoll={storage.showPoll}
					selectedPoll={storage.selectedPoll}
					body=
					{
						<SelectedPollData
							storage={storage}
							setStorage={setStorage}
							pollContract={pollContract}
						/>
					}
					exit=
					{
						() => {
							setStorage({
								...storage,
								showPoll: false,
								selectedPoll: undefined,
								choices: undefined,
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