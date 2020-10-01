import React from 'react'
import styled from 'styled-components';

const Component = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-end;
`;

function Body() {
	return (
		<Component>
			<p>Our aim is to take surveys and vote programs from having a centralized storage to a decentralized one!</p>
			<p>Today many countries suffer from having to trust a centralized party to keep track of votes and to trust that their votes won't be fraudulously changed.</p>
		</Component>
	);
}

export default Body;