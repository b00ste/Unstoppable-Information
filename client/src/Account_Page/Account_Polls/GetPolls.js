import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-end;
	word-wrap: break-word;
	h2 {
		padding: 1em 0 0em 0;
		color: #fff;
	}
	div {
		width: 20rem;
		word-wrap: break-word;
		text-align: center;
		margin: 2rem;
		h4 {
			margin: 2em 1em 0.5em 1em;
		}
		button {
			margin: 2em 1em 1em 1em;
		}
	}
`;

function GetUserPolls({ storage, setStorage, pollContract }) {

	const getUserPolls = async () => {
		setStorage({
			...storage,
			loading: true
		});
		const newNrOfUserPolls = await pollContract.methods.getUserCreatedPolls().call({ from: storage.userAddress });
		const newTitles = [];
		for (let i = newNrOfUserPolls - 1; i >= 0; i--) {
			newTitles.push(await pollContract.methods.getUserNumberOfPolls(i).call({ from: storage.userAddress }));
		}
		setStorage({
			...storage,
			nrOfUserPolls: newNrOfUserPolls,
			userPollTitles: newTitles,
			loading: false
		});
	}

	useEffect(() => {
		if (storage.nrOfUserPolls === undefined && storage.userPollTitles === undefined) {
			getUserPolls();
		}
	}, [storage.userAddress]);

	return (
		<>
			<Container>
				<h2>
					You have created {storage.nrOfUserPolls} {storage.nrOfUserPolls !== undefined && (storage.nrOfUserPolls.lenght > 1 || storage.nrOfUserPolls.lenght === 0) ? 'polls' : 'poll'}.
				</h2>
			</Container>
			<Container>
				{
					storage.userPollTitles !== undefined
						? storage.userPollTitles
							.filter(val => val.includes(storage.searchVal))
							.map(val =>
								<div key={uuidv4()} className="card-default">
									<h4>{val}</h4>
									<button
										onClick={() => {
											setStorage({
												...storage,
												showPoll: true,
												selectedPoll: val
											});
										}}
									>
										Show details
									</button>
								</div>
							)
						: <></>
				}
			</Container>
		</>
	);
}

export default GetUserPolls;