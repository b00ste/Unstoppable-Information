import React, { useState } from 'react'
import styled from 'styled-components';

const CardFront = styled.div`
	transform: rotateY(0deg);
	background: lightblue;
	border: 0;
`;
const CardBack = styled.div`
	position: absolute;
	opacity: 0;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	transform: rotateY(-180deg);
	background: lightgreen;
	border: 0;
`;
const Card = styled.div`
	position: relative;
	margin: 1em;
	>${CardFront},
	>${CardBack} {
		display: block;
		padding: 2em;
		height: 18rem;
		width: 20rem;
		border-radius: 50%;
		
		transition-timing-function: cubic-bezier(.175, .885, .32, 1.275);
		transition-duration: .5s;
		transition-property: transform, opacity;
	}
	&.flipped {
		>${CardFront} {
				transform: rotateY(180deg);
		}
		>${CardBack} {
				opacity: 1;
				transform: rotateY(0deg);
		}
	}
	&:hover {
		cursor: pointer;
	}
`;

function FlippingCard({ front, back }) {
	const [flipped, setFlipped] = useState(false);

	return (
		<Card onClick={() => setFlipped(!flipped)} className={flipped ? "flipped" : ""}>
				<CardFront className="card-default">
					{front}
				</CardFront>
				<CardBack className="card-default">
					{back}
				</CardBack>
		</Card>
	);
}

export default FlippingCard;