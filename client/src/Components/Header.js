import React from 'react';
import styled from 'styled-components';
import {
	Link
} from 'react-router-dom';
import Balance from './Balance.js';
import Search from './Search.js'

const Dropdown = styled.div`
	max-width: 140px;
	.dropdown-menu {
		transform: translate(-10%, 0);
	}
	.dropdown-toggle {
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.balance {
		text-align: center;
		margin: 1em;
	}
`;
const Div = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	div {
		margin: 0em 0.5em;
	}
`;

function Header({ storage, setStorage, tokenContract }) {

	let loadingDiv;
	if (storage.loading && !storage.showSurvey) {
		loadingDiv =
			<div className="progress">
				<div className="progress-bar progress-bar-striped progress-bar-animated bg-info" style={{ width: "100%" }}></div>
			</div>
	}
	else {
		loadingDiv = <></>
	}

	return (
		<div className="header">
			<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
				<Link className="navbar-brand change-color-on-hover" to="/" style={{color: "#fdfcfa"}}>Unstopable information</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarColor01">
					<Div className="navbar-nav mr-auto">
						<div className="nav-item">
							<Link className="nav-link change-color-on-hover" to="/App"> App </Link>
						</div>
						<Dropdown className="nav-item dropdown">
							<span className="nav-link change-color-on-hover dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{storage.userAddress}</span>
							<div className="dropdown-menu">
								<Balance
									storage={storage}
									setStorage={setStorage}
									tokenContract={tokenContract}
								/>
								<Link className="dropdown-item change-color-on-hover" to="/accountSurveys">Your Surveys</Link>
								<Link className="dropdown-item change-color-on-hover" to="/accountPolls">Your Polls</Link>
							</div>
						</Dropdown>
					</Div>
					<Search
						storage={storage}
						setStorage={setStorage}
					/>
				</div>
			</nav>
			{loadingDiv}
		</div>
	);
}

export default Header;