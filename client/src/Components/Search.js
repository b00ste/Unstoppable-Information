import React from 'react'
import styled from 'styled-components';

const Div = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	input {
		width: 15em;
		margin: 0.5em;
	}
	#hidden {
		display: none;
	}
`;

function Search(props) {

	let newSearchVal;
	const changeSearchVal = (event) => {
		event.preventDefault();
		newSearchVal = event.target.value;
		props.setSearchVal(newSearchVal);
	}

	let displayValue = 'hidden';
	if(props.surveyTitles !== undefined) {
		displayValue = '';
	}
	else {
		displayValue = 'hidden';
	}

	return (
		<Div>
			<input className="form-control mr-sm-2" id={displayValue} type="text" placeholder="Search" onChange={changeSearchVal} />
		</Div>
	);
}

export default Search;