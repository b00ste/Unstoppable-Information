import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

const P = styled.p`
	color: ${props => { if (props.choice == props.selectedChoice) return ('#3e005c') }};
`;

function GetChoices({ storage, setStorage, pollContract }) {

	const getSurveyChoices = async () => {
		setStorage({
			...storage,
			loading: true
		});
		let newBytes32Choices = await pollContract.methods.getPollStringToBytes32ArrayStorage(storage.utils.asciiToHex(storage.selectedPoll), 'choices').call();
		let newStringChices = [];
		newBytes32Choices.forEach(choice => {
			newStringChices.push(storage.utils.hexToUtf8(choice));
		});
		setStorage({
			...storage,
			loading: false,
			choices: newStringChices
		});
	}

	useEffect(() => {
		if (storage.choices === undefined && storage.showPoll && storage.selectedPoll !== undefined) {
			getSurveyChoices();
		}
	}, []);

	return (
		<>
			{
				storage.choices !== undefined ?
					storage.choices
						.map((val) =>
							<P
								className="clickable"
								key={uuidv4()}
								choice={val}
								selectedChoice={storage.choice}
								onClick={(res) =>
									setStorage({ ...storage, choice: res.target.firstChild.nodeValue })
								}
							>
								{val}
							</P>
						)
					: <></>
			}
		</>
	);
}

export default GetChoices;