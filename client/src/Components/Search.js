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

function Search({ storage, setStorage }) {

	const changeSearchVal = (event) => {
		event.preventDefault();
		setStorage({ ...storage, searchVal: event.target.value });
	}

	let displayValue = 'hidden';
	if(storage.titles !== undefined) {
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