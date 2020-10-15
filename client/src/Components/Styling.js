import React from 'react'
import { createGlobalStyle } from 'styled-components'

const Global = createGlobalStyle`
	html {
		background: rgb(166,192,240);
		background: -moz-linear-gradient(45deg, rgba(166,192,240,1) 0%, rgba(208,159,184,0.9108018207282913) 50%, rgba(246,128,132,1) 100%);
		background: -webkit-linear-gradient(45deg, rgba(166,192,240,1) 0%, rgba(208,159,184,0.9108018207282913) 50%, rgba(246,128,132,1) 100%);
		background: linear-gradient(45deg, rgba(166,192,240,1) 0%, rgba(208,159,184,0.9108018207282913) 50%, rgba(246,128,132,1) 100%);
		filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#a6c0f0",endColorstr="#f68084",GradientType=1);
		background-attachment:fixed;
		font-family: 'Varela', sans-serif;
		svg {
			color: #fdfcfa;
		}
	}

	*, *:before, *:after {
		box-sizing: border-box;
	}

	input[type="text"], input[type="number"] {
		border: 0;
		height: 3.5em;
		text-align: center;
		background-color: #fdfcfa;
		letter-spacing: 0.05em;
		font-weight: 600;
		&:focus {
			outline: none;
		}
	}

	button {
		border: 0;
		height: 3.5em;
		text-align: center;
		color: #1a1a1a;
		background-color: #fdfcfa;
		letter-spacing: 0.05em;
		font-weight: 500;
		&:focus {
			outline: none;
		}
		&:hover {
			background-color: #e8eae6;
		}
	}

	nav {
		box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.5), 0 0 6px 0 rgba(0, 0, 0, 0.4);
	}

	footer, .header {
		opacity: 0.95;
	}

	footer:hover, .header:hover {
		opacity: 1;
	}

	.card-default {
		background-color: #87004c;
		background-image: linear-gradient(225deg, #87004c 0%, #784BA0 50%, #2B86C5 100%);
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.175);
		border: 0;
		margin: 1em 1em;
		border-radius: 25px;

		width: 21em;
		text-align: center;
		overflow-y: auto;
		button {
			width: 16em;
		}
		input[type="text"], input[type="number"] {
			width: 20em;
			margin: 2em !important;
		}
		h4 {
			color: #fff;
			margin: 2em 2em 0 2em;
			font-weight: 500;
			letter-spacing: 0.1em;
		}
		h6 {
			color: #fff;
			margin-top: 2em;
			font-weight: 500;
			letter-spacing: 0.05em;
		}
		button, input[type="text"], input[type="number"] {
			box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.175);
			display: inline-block;
			margin 0.5em;
		}
	}
	.change-color-on-hover:hover {
		color: #B3315F !important;
		cursor: pointer;
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