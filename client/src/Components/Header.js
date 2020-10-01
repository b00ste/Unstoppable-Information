import React from 'react';
import styled from 'styled-components';
import {
	Link
} from 'react-router-dom';
import Balance from './Balance';

const HeaderStyle = styled.header`
	a:hover {
		color: rgb(170, 170, 170) !important;
	}
`;

const Bar = styled.div`
	min-width: 540px;
	width: 100%;
`;

const RightLi = styled.li`
	position: absolute;
	right: 0;
	max-width: 140px;
	display: inline-block;
	white-space: nowrap;
	overflow: hidden !important;
	text-overflow: ellipsis;
	a {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
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
		<HeaderStyle>
			<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
				<Link className="navbar-brand" to="/">Survey App</Link>
				<ul className="navbar-nav mr-auto">
					<li className="nav-item active">
						<Link className="nav-link" to="/startSurveys"> Start a Survey </Link>
					</li>
					<li className="nav-item active">
						<Link className="nav-link" to="/participateSurveys"> Participate at Surveys </Link>
					</li>
					<li className="nav-item active">
						<Link className="nav-link" to="/aboutUs"> About Us </Link>
					</li>
					<RightLi className="nav-item active">
						<Link className="nav-link" to="/account">{props.userAddress}</Link>
					</RightLi>
				</ul>
			</nav>
			{loading}
			<div className="progress">
				<Bar className="progress-bar">
					<Balance
						balance={props.balance}
						setBalance={props.setBalance}

						surveysContract={props.surveysContract}
						userAddress={props.userAddress}
						setLoading={props.setLoading}
					/>
				</Bar>
			</div>
		</HeaderStyle>
	);
}

export default Header;