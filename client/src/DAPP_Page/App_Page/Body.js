import React from 'react'
import styled from 'styled-components';
import Card from '../../Components/FlippingCard'

const Row = styled.div`
	display: flex;
	flex-direction: row;
	background-color: blue
`;
const Column = styled.div`
	display: flex;
	flex-direction: column;
`;

function AppBody() {
	return (
		<>
			<Row>
				<Column>
					<Card/>
				</Column>
				<Column>
					<Card/>
				</Column>
			</Row>
			<Row>
				<Column>
					<Card/>
				</Column>
				<Column>
					<Card/>
				</Column>
			</Row>
		</>
	);
}

export default AppBody;