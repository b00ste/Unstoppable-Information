import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	Link
} from 'react-router-dom';
import Balance from './Balance.js';
import Search from './Search.js'

const HeaderStyle = styled.div`
	box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5), 0 0 4px 0 rgba(0, 0, 0, 0.4);
	background-color: #1a1a1a;

	position: fixed;
	top: 0;
	left: 0;
	right: 0;

	display: flex;
	flex-wrap: wrap;
	flex-direction: ${props => props.showResizedNav ? 'column' : 'row'};
	justify-content: space-around;
	align-items: center;
	
	letter-spacing: 0.05em;
	font-weight: 300;

	.brand {
		display: flex;
		font-size: 1.5em;
	}

	svg {
		position: fixed;
		top: 0;
		right: 0;
		margin: 0.75em;
	}

	.links {
		display: flex;
		flex-direction: ${props => props.showResizedNav ? 'column' : 'row'};
		align-items: center;
		>p {
			color: #fdfcfa;
			width: 5em;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			margin: 1em;
		}
	}

	.nav-link {
		color: #fdfcfa;
		text-decoration: none;
		margin: 1em;
		&:active {
			color: #1a1a1a;
		}
	}

	.nav-input {
		width: 15em;
		margin: 1em;
	}
	
	.dropdown-menu {
		position: fixed;
		transform: ${props => props.showResizedNav ? 'translate3d(0, 75%, 0)' : 'translate3d(20%, 70%, 0)'};
		background-color: #eec0c6;
		background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.175);
		border-radius: 5px;
		width: 10em;
		height: 8em;
		text-align: center
	}

	.balance {
		color: #1a1a1a;
		font-weight: 500;
	}
	
	.dropdown-item {
		display: inline-block;
		text-decoration: none;
		margin: 0.3em;
		&:visited {
			color: #1a1a1a;
		}
	}
`;

function Header({ storage, setStorage, tokenContract }) {
	const [showDropdown, setShowDropdown] = useState(false);

	let dropdown;
	if (showDropdown) {
		dropdown =
			<div className="dropdown-menu">
				<Balance
					storage={storage}
					setStorage={setStorage}
					tokenContract={tokenContract}
				/>
				<Link className="change-color-on-hover dropdown-item" to="/accountSurveys">Your Surveys</Link>
				<Link className="change-color-on-hover dropdown-item" to="/accountPolls">Your Polls</Link>
			</div>
	}
	else {
		dropdown = <></>
	}

	let loadingDiv;
	if (/*storage.loading && !storage.showSurvey*/true) {
		loadingDiv =
			<div className="progress-bar">
				<span style={{ width: "100%" }}></span>
			</div>
	}
	else {
		loadingDiv = <></>
	}

	let nav;
	if (storage.windowWidth >= 800) {
		nav =
			<>
				<div className="links">
					<Link className="change-color-on-hover nav-link" to="/App"> App </Link>
					<p className="change-color-on-hover" onClick={() => setShowDropdown(!showDropdown)}>{storage.userAddress}</p>
					{dropdown}
				</div>
				<Search
					storage={storage}
					setStorage={setStorage}
				/>
			</>
	}
	else {
		nav =
			<FontAwesomeIcon
				className="change-color-on-hover"
				icon="bars"
				size="2x"
				onClick={(e) => { e.preventDefault(); setStorage({ ...storage, showResizedNav: !storage.showResizedNav }); }}
			/>
	}

	let resizedNav;
	if (storage.showResizedNav) {
		resizedNav =
			<>
				<div className="links">
					<Link className="change-color-on-hover nav-link" to="/App"> App </Link>
					<p className="change-color-on-hover" onClick={() => setShowDropdown(!showDropdown)}>{storage.userAddress}</p>
					{dropdown}
				</div>
				<Search
					storage={storage}
					setStorage={setStorage}
				/>
			</>
	}
	else {
		resizedNav = <></>
	}

	return (
		<div>
			<HeaderStyle className="header" showResizedNav={storage.showResizedNav}>
				<div className="brand">
					<Link className="change-color-on-hover nav-link" to="/" style={{ color: "#fdfcfa" }}>Unstopable information</Link>
				</div>
				{nav}
				{resizedNav}
			</HeaderStyle>
			{loadingDiv}
		</div>
	);
}

export default Header;