import React from 'react'
import Choices from './GetChoices';

function Data({ storage, setStorage, pollContract }) {
	return (
		<>
			<Choices 
				storage={storage}
				setStorage={setStorage}
				pollContract={pollContract}
			/>
		</>
	);
}

export default Data;