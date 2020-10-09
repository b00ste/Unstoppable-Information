import React from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FooterStyle = styled.footer`
	background-color: #1a1a1a;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-end;
	svg {
		margin: 0.6rem 0.7rem;
		color: #fff;
	}
	svg:hover {
		color: rgb(170, 170, 170) !important;
		background-color: #FA8BFF;
		background-image: linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%);

		cursor: pointer;
	}
`

function Footer() {

	return (
		<FooterStyle>
			<FontAwesomeIcon icon={['fab', 'instagram']} size="3x" onClick={() => window.open("https://www.instagram.com/daniel_afteni", "_blank")} />
			<FontAwesomeIcon icon={['fab', 'facebook-f']} size="3x" onClick={() => window.open("https://www.facebook.com", "_blank")} />
			<FontAwesomeIcon icon={['fab', 'twitter']} size="3x" onClick={() => window.open("https://twitter.com/afteni_daniel", "_blank")} />
			<FontAwesomeIcon icon={['fab', 'telegram-plane']} size="3x" onClick={() => window.open("https://telegram.org", "_blank")} />
			<FontAwesomeIcon icon={['fab', 'github']} size="3x" onClick={() => window.open("https://github.com/b00ste", "_blank")} />
		</FooterStyle>
	);
}

export default Footer;