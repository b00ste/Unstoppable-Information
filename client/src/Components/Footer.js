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
	}
`

function Footer() {

	return (
		<FooterStyle>
			<FontAwesomeIcon icon={['fab', 'instagram']} size="3x" onClick={() => window.open("https://www.instagram.com/daniel_afteni", "_blank")} className="change-color-on-hover" />
			<FontAwesomeIcon icon={['fab', 'facebook-f']} size="3x" onClick={() => window.open("https://www.facebook.com", "_blank")} className="change-color-on-hover" />
			<FontAwesomeIcon icon={['fab', 'twitter']} size="3x" onClick={() => window.open("https://twitter.com/afteni_daniel", "_blank")} className="change-color-on-hover" />
			<FontAwesomeIcon icon={['fab', 'telegram-plane']} size="3x" onClick={() => window.open("https://telegram.org", "_blank")} className="change-color-on-hover" />
			<FontAwesomeIcon icon={['fab', 'github']} size="3x" onClick={() => window.open("https://github.com/b00ste", "_blank")} className="change-color-on-hover" />
		</FooterStyle>
	);
}

export default Footer;