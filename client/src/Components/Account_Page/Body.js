import React, { useState, useEffect } from 'react'

function Body(props) {
	const [nrOfSurveys, setNrOfSurveys] = useState(undefined);
	const [surveys, setSurveys] = useState([]);
	
	const getUSerInfo = async () => {
		console.log(nrOfSurveys);
	}

	useEffect(() => {
		if(nrOfSurveys === undefined)
			getUSerInfo();
	})

	return(
		<></>
	);
}

export default Body;