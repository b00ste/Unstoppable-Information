import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../../Components/FlippingCard';
import { Link } from 'react-router-dom';

const Row = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: center;
	align-items: flex-end;
`;
const Column = styled.div`
	display: flex;
	h4 {
		font-size: 1.3em;
	}
	h6 {
		font-size: 0.8em;
	}
	a {
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.175);
		background-color: #fdfcfa;
		color: #1a1a1a;
		text-decoration: none;
		display: inline-block;
		padding: 1em 5em;
		margin-top: 0.7em;
		&:visited {
			color: #1a1a1a;
		}
		&:hover {
			background-color: #e8eae6;
		}
	}
`;

function AppBody() {
	const [link, setLink] = useState("/App");
	return (
		<>
			<Row>
				<Column>
					<Card
						front="Set up a new unstopable survey!"
						back={
							<>
								<h6>
									Be aware that any information you provide and ask from participants is public.
									Incentivate people to participate at your surveys, ask decent questions!
								</h6>
								<Link
									to={link}
									onClick={(e) => {
										e.stopPropagation();
										let flippedStatus = e.currentTarget.parentNode.parentNode.className.includes('flipped');
										if (flippedStatus) {
											setLink("/App/Set_Survey");
										}
										else {
											return 0;
										}
									}}
								>
									Let's go!
								</Link>
							</>
						}
					/>
				</Column>
				<Column>
					<Card
						front="Complete some surveys and earn some coins!"
						back={
							<>
								<h6>
									Be aware that any information you provide using our app is
									public and anyone can access it on blockchain. Please do not
									provide any informationthat can be used against you!
								</h6>
								<Link
									to={link}
									onClick={(e) => {
										e.stopPropagation();
										let flippedStatus = e.currentTarget.parentNode.parentNode.className.includes('flipped');
										if (flippedStatus) {
											setLink("/App/Get_Surveys");
										}
										else {
											return 0;
										}
									}}
								>
									Let's go!
								</Link>
							</>
						}
					/>
				</Column>
			</Row>
			<Row>
				<Column>
					<Card
						front="Set up a new unstopable poll!"
						back={
							<>
								<h6>
									Be aware that any information you provide and ask from participants is public.
									Incentivate people to participate at your surveys, set decent poll choices!
								</h6>
								<Link
									to={link}
									onClick={(e) => {
										e.stopPropagation();
										let flippedStatus = e.currentTarget.parentNode.parentNode.className.includes('flipped');
										if (flippedStatus) {
											setLink("/App/Set_Poll");
										}
										else {
											return 0;
										}
									}}
								>
									Let's go!
								</Link>
							</>
						}
					/>
				</Column>
				<Column>
					<Card
						front="Participate at polls and earn some coins!"
						back={
							<>
								<h6>
									Be aware that any information you provide using our app is
									public and anyone can access it on blockchain. Please do not
									provide any informationthat can be used against you!
								</h6>
								<Link
									to={link}
									onClick={(e) => {
										e.stopPropagation();
										let flippedStatus = e.currentTarget.parentNode.parentNode.className.includes('flipped');
										if (flippedStatus) {
											setLink("/App/Get_Polls");
										}
										else {
											return 0;
										}
									}}
								>
									Let's go!
								</Link>
							</>
						}
					/>
				</Column>
			</Row>
		</>
	);
}

export default AppBody;