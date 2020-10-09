import React from 'react'
import Particles from 'react-particles-js'
import styled, { createGlobalStyle } from 'styled-components'

const Global = createGlobalStyle`
	html {
		background: linear-gradient(to right, #360033, #0b8793) !important;
	}
	body {
		background: inherit;
	}
	nav {
		box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5), 0 0 4px 0 rgba(0, 0, 0, 0.4);
	}
	footer {
		box-shadow: 6px 6px 6px 6px rgba(0, 0, 0, 0.5), 4px 4px 4px 4px rgba(0, 0, 0, 0.4);
	}
	.card-default {
		background-color: #87004c;
		background-image: linear-gradient(225deg, #87004c 0%, #784BA0 50%, #2B86C5 100%);
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.175);
		border: 0;
		margin: 0.5em 1em;
		border-radius: 25px;

		width: 25em;
		height: 14em;
		margin-top: 2.5rem;
		text-align: center;
		overflow: auto;
		button {
			width: 18em;
		}
		input {
			width: 20em;
		}
		h4 {
			color: #fff;
			margin-top: 2em;
		}
		button, input {
			box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.175);
			display: inline-block;
			margin 0.5em;
		}
	}
`;

function Background() {
	return (
		<>
			<Global />
		</>
	);
}

export default Background;