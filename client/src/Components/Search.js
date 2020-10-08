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
`;

function Search({ storage, setStorage }) {

	const changeSearchVal = (event) => {
		event.preventDefault();
		setStorage({ ...storage, searchVal: event.target.value });
	}

	let displayInput;
	if(storage.titles === undefined) {
		displayInput = <></>;
	}
	else {
		displayInput = <input className="form-control mr-sm-2" type="text" placeholder="Search" onChange={changeSearchVal} />;
	}

	return (
		<Div>
			{displayInput}
		</Div>
	);
}

export default Search;