import React from 'react';
import styled from 'styled-components';
import {
	Link
} from 'react-router-dom';

const Bar = styled.div`
width: 100%;
`

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
	if (props.loading) {
		loading =
			<div className="progress">
				<Bar className="progress-bar progress-bar-striped progress-bar-animated"></Bar>
			</div>
	}
	return (
		<>
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
				<Bar className="progress-bar"></Bar>
			</div>
		</>
	);
}

export default Header;