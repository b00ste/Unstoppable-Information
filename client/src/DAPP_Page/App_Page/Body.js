import React from 'react';
import styled from 'styled-components';
import Card from '../../Components/FlippingCard';

const Row = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: center;
	align-items: flex-end;
`;
const Column = styled.div`
	display: flex;
	a {
		text-decoration: none;
	}
`;

function AppBody() {
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
								<button
									type="button"
									className="btn btn-secondary"
									onClick={(e) => {
										e.preventDefault();
										let flippedStatus = e.currentTarget.parentNode.parentNode.className.includes('flipped');
										if (flippedStatus) {
											window.location.href = '/App/Set_Survey';
										}
									}}
								>
									Let's go!
								</button>
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
								<button
									type="button"
									className="btn btn-secondary"
									onClick={(e) => {
										e.preventDefault();
										let flippedStatus = e.currentTarget.parentNode.parentNode.className.includes('flipped');
										if (flippedStatus) {
											window.location.href = '/App/Get_Surveys';
										}
									}}
								>
									Let's go!
								</button>
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
								<button
									type="button"
									className="btn btn-secondary"
									onClick={(e) => {
										e.preventDefault();
										let flippedStatus = e.currentTarget.parentNode.parentNode.className.includes('flipped');
										if (flippedStatus) {
											window.location.href = '/App/Set_Poll';
										}
									}}
								>
									Let's go!
								</button>
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
								<button
									type="button"
									className="btn btn-secondary"
									onClick={(e) => {
										e.preventDefault();
										let flippedStatus = e.currentTarget.parentNode.parentNode.className.includes('flipped');
										if (flippedStatus) {
											window.location.href = '/App/Get_Polls';
										}
									}}
								>
									Let's go!
								</button>
							</>
						}
					/>
				</Column>
			</Row>
		</>
	);
}

export default AppBody;