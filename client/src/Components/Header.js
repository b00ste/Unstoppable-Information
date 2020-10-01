import React from 'react';
import styled from 'styled-components';
import {
	Link
} from 'react-router-dom';
import Balance from './Balance.js';
import Search from './Search.js'

const Bar = styled.div`
	width: 100%;
`;
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

function Header(props) {
	let loading = <></>
	if (props.loading && props.selectedSurvey === undefined) {
		loading =
			<div className="progress">
				<Bar className="progress-bar progress-bar-striped progress-bar-animated"></Bar>
			</div>
	}
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
				<Link className="navbar-brand" to="/">Survey App</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarColor01">
					<Div className="navbar-nav mr-auto">
						<div className="nav-item">
							<Link className="nav-link" to="/startSurveys"> Start a Survey </Link>
						</div>
						<div className="nav-item">
							<Link className="nav-link" to="/participateSurveys"> Participate at Surveys </Link>
						</div>
						<div className="nav-item">
							<Link className="nav-link" to="/aboutUs"> About Us </Link>
						</div>
						<Dropdown className="nav-item dropdown">
							<span className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{props.userAddress}</span>
							<div className="dropdown-menu">
								<Balance
									balance={props.balance}
									setBalance={props.setBalance}

									surveysContract={props.surveysContract}
									userAddress={props.userAddress}
									setLoading={props.setLoading}
								/>
								<Link className="dropdown-item" to="/accountSurveys">Your Surveys</Link>
								<Link className="dropdown-item" to="/accountElections">Your Elections</Link>
							</div>
						</Dropdown>
					</Div>
					<Search
						surveyTitles={props.surveyTitles}
						setSearchVal={props.setSearchVal}
					/>
				</div>
			</nav>
			{loading}
		</>
	);
}

export default Header;