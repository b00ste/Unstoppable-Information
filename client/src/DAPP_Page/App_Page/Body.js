import React from 'react'
import styled from 'styled-components';

const Component = styled.div`
	display: flex;
	flex-direction: row;
	background-color: blue
	div {

	}
`;

function AppBody() {
	return(
		<Component>
			<div></div>
			<div></div>
		</Component>
	);
}

export default AppBody;