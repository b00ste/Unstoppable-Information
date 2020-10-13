import React from 'react';

function Search({ storage, setStorage }) {

	const changeSearchVal = (event) => {
		event.preventDefault();
		setStorage({ ...storage, searchVal: event.target.value });
	}
	
	return (
		<div>
			<input className="nav-input" type="text" placeholder="Search" onChange={changeSearchVal} />
		</div>
	);
}

export default Search;