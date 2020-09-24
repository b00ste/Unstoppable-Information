import React from 'react'
import styled from 'styled-components';

const FooterStyle = styled.div`
background-color: rgba(46, 49, 49, 0.1);
padding-top: 3px;
position: fixed;
bottom: 0;
left: 0;
right: 0;
padding: 6px;
p {
text-align: center
}
`

function Footer() {

	return (
		<FooterStyle>
			<p>&copy; Copyright 2020</p>
		</FooterStyle>
	);
}

export default Footer;